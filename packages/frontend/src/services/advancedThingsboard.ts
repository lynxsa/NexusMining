export interface ThingsBoardDevice {
  id: string;
  name: string;
  type: string;
  label: string;
  deviceProfileId: string;
  customerId: string;
  additionalInfo: Record<string, unknown>;
  tenantId: string;
  createdTime: number;
  active?: boolean;
  lastActivityTime?: number;
}

export interface TelemetryData {
  ts: number;
  values: Record<string, string | number | boolean>;
}

export interface AttributeData {
  key: string;
  value: string | number | boolean;
  lastUpdateTs: number;
}

export interface DeviceCredentials {
  id: string;
  deviceId: string;
  credentialsType: string;
  credentialsId: string;
  credentialsValue: string;
}

export interface ConnectionStatus {
  connected: boolean;
  authenticated: boolean;
  error?: string;
  lastConnected?: Date;
}

export class AdvancedThingsBoardService {
  private baseUrl: string;
  private jwtToken: string | null = null;
  private wsConnection: WebSocket | null = null;
  private subscriptions: Map<string, (data: unknown) => void> = new Map();
  private connectionStatus: ConnectionStatus = {
    connected: false,
    authenticated: false
  };
  private eventListeners: Map<string, Set<(data?: unknown) => void>> = new Map();

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    // Initialize event listener collections
    ['connection', 'authentication', 'telemetry', 'device', 'error'].forEach(event => {
      this.eventListeners.set(event, new Set());
    });
  }

  // Event system for reactive updates
  public addEventListener(event: string, callback: (data?: unknown) => void) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);
  }

  public removeEventListener(event: string, callback: (data?: unknown) => void) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  private emit(event: string, data?: unknown) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Enhanced authentication with retry logic
  async authenticate(username: string = 'tenant@thingsboard.org', password: string = 'tenant'): Promise<boolean> {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          const data = await response.json();
          this.jwtToken = data.token;
          this.connectionStatus = {
            connected: true,
            authenticated: true,
            lastConnected: new Date()
          };
          this.emit('authentication', { success: true });
          return true;
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Authentication failed with status ${response.status}`);
        }
      } catch (error) {
        attempt++;
        console.error(`Authentication attempt ${attempt} failed:`, error);
        
        if (attempt >= maxRetries) {
          this.connectionStatus = {
            connected: false,
            authenticated: false,
            error: error instanceof Error ? error.message : 'Authentication failed'
          };
          this.emit('authentication', { success: false, error });
          return false;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    return false;
  }

  // Connection status
  public getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  // Device Management
  async getDevices(pageSize: number = 50, page: number = 0, type?: string): Promise<ThingsBoardDevice[]> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      let url = `${this.baseUrl}/api/tenant/devices?pageSize=${pageSize}&page=${page}`;
      if (type) {
        url += `&type=${type}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
      throw new Error('Failed to fetch devices');
    } catch (error) {
      console.error('Error fetching devices:', error);
      return [];
    }
  }

  async createDevice(device: Partial<ThingsBoardDevice>): Promise<ThingsBoardDevice | null> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/device`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to create device');
    } catch (error) {
      console.error('Error creating device:', error);
      return null;
    }
  }

  // Telemetry Operations
  async getLatestTelemetry(deviceId: string, keys?: string[]): Promise<Record<string, TelemetryData>> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      let url = `${this.baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`;
      if (keys && keys.length > 0) {
        url += `?keys=${keys.join(',')}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch telemetry');
    } catch (error) {
      console.error('Error fetching telemetry:', error);
      return {};
    }
  }

  async getTelemetryHistory(
    deviceId: string,
    keys: string[],
    startTs: number,
    endTs: number,
    interval?: number,
    limit?: number,
    agg?: 'MIN' | 'MAX' | 'AVG' | 'SUM' | 'COUNT' | 'NONE'
  ): Promise<Record<string, TelemetryData[]>> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const url = `${this.baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`;
      const params = new URLSearchParams({
        keys: keys.join(','),
        startTs: startTs.toString(),
        endTs: endTs.toString()
      });

      if (interval) params.append('interval', interval.toString());
      if (limit) params.append('limit', limit.toString());
      if (agg) params.append('agg', agg);

      const response = await fetch(`${url}?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch telemetry history');
    } catch (error) {
      console.error('Error fetching telemetry history:', error);
      return {};
    }
  }

  async saveTelemetry(deviceId: string, telemetry: Record<string, string | number | boolean>): Promise<boolean> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/timeseries/ANY`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(telemetry)
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving telemetry:', error);
      return false;
    }
  }

  // Attributes Management
  async getAttributes(deviceId: string, scope: 'CLIENT_SCOPE' | 'SERVER_SCOPE' | 'SHARED_SCOPE' = 'SERVER_SCOPE'): Promise<AttributeData[]> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/values/attributes/${scope}`, {
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch attributes');
    } catch (error) {
      console.error('Error fetching attributes:', error);
      return [];
    }
  }

  async saveAttributes(deviceId: string, attributes: Record<string, string | number | boolean>, scope: 'CLIENT_SCOPE' | 'SERVER_SCOPE' | 'SHARED_SCOPE' = 'SERVER_SCOPE'): Promise<boolean> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/plugins/telemetry/DEVICE/${deviceId}/${scope}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attributes)
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving attributes:', error);
      return false;
    }
  }

    // Real-time Subscriptions via WebSocket
  async subscribeToTelemetry(deviceId: string, keys: string[], callback: (data: unknown) => void): Promise<string> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    const subscriptionId = `${deviceId}_${Date.now()}`;
    
    const subscriptionCommand = {
      tsSubCmds: [{
        entityType: 'DEVICE',
        entityId: deviceId,
        scope: 'LATEST_TELEMETRY',
        cmdId: subscriptionId,
        keys: keys
      }]
    };

    this.subscriptions.set(subscriptionId, callback);
    
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(subscriptionCommand));
    }

    return subscriptionId;
  }

  async subscribeToAttributes(deviceId: string, callback: (data: unknown) => void): Promise<string> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    const subscriptionId = `${deviceId}_attr_${Date.now()}`;
    
    if (!this.wsConnection) {
      await this.initializeWebSocket();
    }

    const subscriptionCommand = {
      attrSubCmds: [{
        entityType: 'DEVICE',
        entityId: deviceId,
        scope: 'CLIENT_SCOPE',
        cmdId: subscriptionId
      }]
    };

    this.subscriptions.set(subscriptionId, callback);
    
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(subscriptionCommand));
    }

    return subscriptionId;
  }

  unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
    
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      const unsubscribeCommand = {
        unsubscribe: {
          cmdId: subscriptionId
        }
      };
      this.wsConnection.send(JSON.stringify(unsubscribeCommand));
    }
  }

  private async initializeWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = this.baseUrl.replace('http', 'ws') + `/api/ws/plugins/telemetry?token=${this.jwtToken}`;
      
      this.wsConnection = new WebSocket(wsUrl);
      
      this.wsConnection.onopen = () => {
        console.log('WebSocket connected to ThingsBoard');
        resolve();
      };
      
      this.wsConnection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.subscriptionId && this.subscriptions.has(data.subscriptionId)) {
            const callback = this.subscriptions.get(data.subscriptionId);
            if (callback) {
              callback(data);
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
      
      this.wsConnection.onclose = () => {
        console.log('WebSocket disconnected');
        this.wsConnection = null;
        
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (this.jwtToken) {
            this.initializeWebSocket();
          }
        }, 5000);
      };
    });
  }

  // Device Credentials
  async getDeviceCredentials(deviceId: string): Promise<DeviceCredentials | null> {
    if (!this.jwtToken) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/device/${deviceId}/credentials`, {
        headers: {
          'Authorization': `Bearer ${this.jwtToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch device credentials');
    } catch (error) {
      console.error('Error fetching device credentials:', error);
      return null;
    }
  }

  // Mock data generation for demo purposes
  async generateMockMiningData(): Promise<void> {
    const miningDevices = [
      { name: 'Haul-Truck-HT247', type: 'TRUCK', latitude: -26.2041, longitude: 28.0473 },
      { name: 'Excavator-EX112', type: 'EXCAVATOR', latitude: -26.1941, longitude: 28.0573 },
      { name: 'Drill-Rig-DR89', type: 'DRILL', latitude: -26.2141, longitude: 28.0373 },
      { name: 'Conveyor-CB1200', type: 'CONVEYOR', latitude: -26.2000, longitude: 28.0500 },
      { name: 'Processing-Plant-PP1', type: 'PROCESSING', latitude: -26.2100, longitude: 28.0450 }
    ];

    for (const device of miningDevices) {
      const mockTelemetry = this.generateMockTelemetryForDevice(device.type);
      const mockAttributes = {
        latitude: device.latitude,
        longitude: device.longitude,
        deviceType: device.type,
        manufacturer: 'Caterpillar Inc.',
        model: 'CAT-789D',
        serialNumber: `SN${Math.random().toString(36).substr(2, 9)}`,
        installationDate: '2024-01-15',
        lastMaintenance: '2024-07-15'
      };

      console.log(`Mock data for ${device.name}:`, { telemetry: mockTelemetry, attributes: mockAttributes });
    }
  }

  private generateMockTelemetryForDevice(deviceType: string): Record<string, string | number> {
    const baseData = {
      timestamp: Date.now(),
      temperature: Math.round(60 + Math.random() * 40),
      vibration: Math.round((Math.random() * 5) * 100) / 100,
      status: Math.random() > 0.1 ? 'operational' : (Math.random() > 0.5 ? 'maintenance' : 'critical')
    };

    switch (deviceType) {
      case 'TRUCK':
        return {
          ...baseData,
          speed: Math.round(Math.random() * 60),
          fuelLevel: Math.round(20 + Math.random() * 80),
          engineHours: Math.round(1000 + Math.random() * 5000),
          loadWeight: Math.round(50 + Math.random() * 100)
        };
      case 'EXCAVATOR':
        return {
          ...baseData,
          hydraulicPressure: Math.round(150 + Math.random() * 100),
          bucketPosition: Math.round(Math.random() * 360),
          operatingHours: Math.round(500 + Math.random() * 3000),
          productivity: Math.round(70 + Math.random() * 30)
        };
      case 'DRILL':
        return {
          ...baseData,
          drillDepth: Math.round(10 + Math.random() * 200),
          rotationSpeed: Math.round(100 + Math.random() * 200),
          bitWear: Math.round(Math.random() * 100),
          penetrationRate: Math.round(1 + Math.random() * 10)
        };
      case 'CONVEYOR':
        return {
          ...baseData,
          beltSpeed: Math.round(1 + Math.random() * 5),
          materialFlow: Math.round(50 + Math.random() * 200),
          motorLoad: Math.round(50 + Math.random() * 50),
          efficiency: Math.round(80 + Math.random() * 20)
        };
      case 'PROCESSING':
        return {
          ...baseData,
          throughput: Math.round(100 + Math.random() * 300),
          recovery: Math.round(85 + Math.random() * 15),
          powerConsumption: Math.round(500 + Math.random() * 1000),
          qualityIndex: Math.round(90 + Math.random() * 10)
        };
      default:
        return baseData;
    }
  }

  // Cleanup
  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.subscriptions.clear();
    this.jwtToken = null;
  }
}

// Create singleton instance
export const thingsBoardService = new AdvancedThingsBoardService();
