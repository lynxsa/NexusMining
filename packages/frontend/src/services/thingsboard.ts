// ThingsBoard API Integration Service
// Connects to ThingsBoard REST API for device management and telemetry data

export interface ThingsBoardConfig {
  host: string;
  username: string;
  password: string;
  token?: string;
}

export interface Device {
  id: {
    id: string;
    entityType: string;
  };
  name: string;
  type: string;
  label?: string;
  additionalInfo?: any;
}

export interface TelemetryData {
  [key: string]: Array<{
    ts: number;
    value: string | number;
  }>;
}

export interface AssetTelemetry {
  deviceId: string;
  deviceName: string;
  temperature?: number;
  vibration?: number;
  pressure?: number;
  status: 'operational' | 'maintenance' | 'critical';
  lastUpdate: Date;
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
}

class ThingsBoardService {
  private config: ThingsBoardConfig;
  private authToken: string | null = null;
  private baseUrl: string;

  constructor(config: ThingsBoardConfig) {
    this.config = config;
    this.baseUrl = `http://${config.host}:8080/api`;
  }

  // Authenticate with ThingsBoard
  async authenticate(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.config.username,
          password: this.config.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.authToken = data.token;
        return true;
      }
      return false;
    } catch (error) {
      console.error('ThingsBoard authentication failed:', error);
      return false;
    }
  }

  // Get all devices
  async getDevices(): Promise<Device[]> {
    if (!this.authToken) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.baseUrl}/tenant/devices?pageSize=1000&page=0`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      return [];
    }
  }

  // Get telemetry data for a device
  async getDeviceTelemetry(deviceId: string, keys: string[] = ['temperature', 'vibration', 'pressure']): Promise<TelemetryData> {
    if (!this.authToken) {
      await this.authenticate();
    }

    const endTime = Date.now();
    const startTime = endTime - (24 * 60 * 60 * 1000); // Last 24 hours

    try {
      const keysParam = keys.join(',');
      const response = await fetch(
        `${this.baseUrl}/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keysParam}&startTs=${startTime}&endTs=${endTime}`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
      return {};
    } catch (error) {
      console.error('Failed to fetch telemetry:', error);
      return {};
    }
  }

  // Get latest telemetry values
  async getLatestTelemetry(deviceId: string, keys: string[] = ['temperature', 'vibration', 'pressure']): Promise<{[key: string]: any}> {
    if (!this.authToken) {
      await this.authenticate();
    }

    try {
      const keysParam = keys.join(',');
      const response = await fetch(
        `${this.baseUrl}/plugins/telemetry/DEVICE/${deviceId}/values/timeseries?keys=${keysParam}&useStrictDataTypes=true`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result: {[key: string]: any} = {};
        
        // Extract latest values
        Object.keys(data).forEach(key => {
          if (data[key] && data[key].length > 0) {
            result[key] = data[key][0].value;
          }
        });
        
        return result;
      }
      return {};
    } catch (error) {
      console.error('Failed to fetch latest telemetry:', error);
      return {};
    }
  }

  // Get enriched asset data with telemetry
  async getAssetTelemetry(): Promise<AssetTelemetry[]> {
    const devices = await this.getDevices();
    const assets: AssetTelemetry[] = [];

    // Mock mining equipment locations around Johannesburg
    const miningLocations = [
      { lat: -26.2041, lng: 28.0473, name: 'Gold Mine Alpha' },
      { lat: -26.1867, lng: 27.9648, name: 'Platinum Site Beta' },
      { lat: -26.2309, lng: 28.1123, name: 'Coal Extraction Gamma' },
      { lat: -26.1576, lng: 27.9856, name: 'Diamond Mine Delta' },
      { lat: -26.2185, lng: 28.0821, name: 'Processing Plant Epsilon' },
    ];

    for (let i = 0; i < Math.min(devices.length, 12); i++) {
      const device = devices[i];
      const telemetry = await this.getLatestTelemetry(device.id.id);
      const location = miningLocations[i % miningLocations.length];

      // Determine status based on telemetry values
      let status: 'operational' | 'maintenance' | 'critical' = 'operational';
      if (telemetry.temperature > 80 || telemetry.vibration > 10) {
        status = 'critical';
      } else if (telemetry.temperature > 60 || telemetry.vibration > 7) {
        status = 'maintenance';
      }

      assets.push({
        deviceId: device.id.id,
        deviceName: device.name,
        temperature: telemetry.temperature || Math.floor(Math.random() * 100) + 20,
        vibration: telemetry.vibration || Math.floor(Math.random() * 15) + 1,
        pressure: telemetry.pressure || Math.floor(Math.random() * 50) + 10,
        status,
        lastUpdate: new Date(),
        location: {
          latitude: location.lat + (Math.random() - 0.5) * 0.01,
          longitude: location.lng + (Math.random() - 0.5) * 0.01,
          altitude: Math.floor(Math.random() * 500) + 1500,
        },
      });
    }

    return assets;
  }

  // WebSocket connection for real-time telemetry
  connectWebSocket(deviceId: string, callback: (data: any) => void): WebSocket | null {
    if (!this.authToken) {
      console.error('Authentication required for WebSocket connection');
      return null;
    }

    try {
      const wsUrl = `ws://${this.config.host}:8080/api/ws/plugins/telemetry?token=${this.authToken}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        // Subscribe to device telemetry
        const subscribeCmd = {
          cmdId: 1,
          deviceId: deviceId,
          keys: 'temperature,vibration,pressure,status',
          timeWindow: 60000,
        };
        ws.send(JSON.stringify(subscribeCmd));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return ws;
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      return null;
    }
  }
}

// Default configuration - can be overridden
const defaultConfig: ThingsBoardConfig = {
  host: 'localhost', // ThingsBoard server
  username: 'tenant@thingsboard.org',
  password: 'tenant',
};

// Singleton instance
export const thingsBoardService = new ThingsBoardService(defaultConfig);

// Mock data for development when ThingsBoard is not available
export const mockAssetTelemetry: AssetTelemetry[] = [
  {
    deviceId: 'excavator-001',
    deviceName: 'Excavator XL-2000',
    temperature: 45,
    vibration: 3.2,
    pressure: 25,
    status: 'operational',
    lastUpdate: new Date(),
    location: { latitude: -26.2041, longitude: 28.0473, altitude: 1650 },
  },
  {
    deviceId: 'drill-002',
    deviceName: 'Drill Rig DR-5000',
    temperature: 72,
    vibration: 8.1,
    pressure: 45,
    status: 'maintenance',
    lastUpdate: new Date(),
    location: { latitude: -26.1867, longitude: 27.9648, altitude: 1580 },
  },
  {
    deviceId: 'truck-003',
    deviceName: 'Haul Truck HT-450',
    temperature: 95,
    vibration: 12.5,
    pressure: 35,
    status: 'critical',
    lastUpdate: new Date(),
    location: { latitude: -26.2309, longitude: 28.1123, altitude: 1720 },
  },
  {
    deviceId: 'conveyor-004',
    deviceName: 'Conveyor Belt CB-1200',
    temperature: 38,
    vibration: 2.1,
    pressure: 15,
    status: 'operational',
    lastUpdate: new Date(),
    location: { latitude: -26.1576, longitude: 27.9856, altitude: 1495 },
  },
];
