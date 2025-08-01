// Simplified ThingsBoard service for testing
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

// Mock data for development
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
