import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { thingsBoardService } from '../../services/advancedThingsboard';

interface TelemetryData {
  [key: string]: number | string;
}

interface AdvancedAsset {
  id: string;
  name: string;
  type: 'truck' | 'excavator' | 'drill' | 'conveyor' | 'processing';
  x: number;
  y: number;
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  telemetry: TelemetryData;
  lastUpdate: Date;
  trail: { x: number; y: number; timestamp: Date }[];
}

interface Advanced2DMapProps {
  className?: string;
  onAssetClick?: (asset: AdvancedAsset) => void;
}

export const Advanced2DMap: React.FC<Advanced2DMapProps> = ({ 
  className = "h-full", 
  onAssetClick 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [assets, setAssets] = useState<AdvancedAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<AdvancedAsset | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [showTelemetry, setShowTelemetry] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isConnectedToThingsBoard, setIsConnectedToThingsBoard] = useState(false);

  // Initialize ThingsBoard connection and mock data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Try to connect to ThingsBoard
        const connected = await thingsBoardService.authenticate();
        setIsConnectedToThingsBoard(connected);

        if (connected) {
          // Fetch real devices from ThingsBoard
          const devices = await thingsBoardService.getDevices(10, 0);
          console.log('Connected to ThingsBoard, devices:', devices);
        }

        // Generate mock mining assets for demonstration
        const mockAssets: AdvancedAsset[] = [
          {
            id: 'truck-001',
            name: 'Haul Truck HT-247',
            type: 'truck',
            x: 45,
            y: 60,
            status: 'operational',
            telemetry: { speed: 45, fuel: 78, temperature: 85, load: 95 },
            lastUpdate: new Date(),
            trail: []
          },
          {
            id: 'excavator-001',
            name: 'Excavator EX-112',
            type: 'excavator',
            x: 25,
            y: 40,
            status: 'maintenance',
            telemetry: { hydraulicPressure: 185, bucketAngle: 45, temperature: 92 },
            lastUpdate: new Date(),
            trail: []
          },
          {
            id: 'drill-001',
            name: 'Drill Rig DR-89',
            type: 'drill',
            x: 80,
            y: 70,
            status: 'critical',
            telemetry: { drillDepth: 85, rotationSpeed: 150, bitWear: 75 },
            lastUpdate: new Date(),
            trail: []
          },
          {
            id: 'conveyor-001',
            name: 'Conveyor CB-1200',
            type: 'conveyor',
            x: 70,
            y: 30,
            status: 'operational',
            telemetry: { beltSpeed: 3.2, materialFlow: 150, efficiency: 89 },
            lastUpdate: new Date(),
            trail: []
          },
          {
            id: 'processing-001',
            name: 'Processing Plant PP-1',
            type: 'processing',
            x: 50,
            y: 50,
            status: 'operational',
            telemetry: { throughput: 250, recovery: 92, powerConsumption: 850 },
            lastUpdate: new Date(),
            trail: []
          }
        ];

        setAssets(mockAssets);

        // Generate initial trails
        mockAssets.forEach(asset => {
          for (let i = 0; i < 10; i++) {
            asset.trail.push({
              x: asset.x + (Math.random() - 0.5) * 5,
              y: asset.y + (Math.random() - 0.5) * 5,
              timestamp: new Date(Date.now() - i * 60000)
            });
          }
        });

      } catch (error) {
        console.error('Failed to initialize ThingsBoard connection:', error);
        setIsConnectedToThingsBoard(false);
      }
    };

    initializeData();
  }, []);

  // Real-time telemetry updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAssets(prevAssets => prevAssets.map(asset => {
        // Simulate movement for trucks
        let newX = asset.x;
        let newY = asset.y;
        
        if (asset.type === 'truck' && asset.status === 'operational') {
          newX += (Math.random() - 0.5) * 2;
          newY += (Math.random() - 0.5) * 2;
          
          // Keep within bounds
          newX = Math.max(10, Math.min(90, newX));
          newY = Math.max(10, Math.min(90, newY));
        }

        // Update telemetry data
        const updatedTelemetry = { ...asset.telemetry };
        Object.keys(updatedTelemetry).forEach(key => {
          if (typeof updatedTelemetry[key] === 'number') {
            updatedTelemetry[key] += (Math.random() - 0.5) * 5;
            updatedTelemetry[key] = Math.max(0, Math.min(100, updatedTelemetry[key]));
          }
        });

        // Add to trail
        const newTrail = [...asset.trail];
        if (newX !== asset.x || newY !== asset.y) {
          newTrail.unshift({ x: newX, y: newY, timestamp: new Date() });
          if (newTrail.length > 20) {
            newTrail.pop();
          }
        }

        return {
          ...asset,
          x: newX,
          y: newY,
          telemetry: updatedTelemetry,
          lastUpdate: new Date(),
          trail: newTrail
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Canvas drawing functions
  const getStatusColor = useCallback((status: string, alpha: number = 1): string => {
    const colors = {
      operational: `rgba(34, 197, 94, ${alpha})`,
      maintenance: `rgba(245, 158, 11, ${alpha})`,
      critical: `rgba(239, 68, 68, ${alpha})`,
      offline: `rgba(107, 114, 128, ${alpha})`
    };
    return colors[status as keyof typeof colors] || colors.offline;
  }, []);

  const getAssetIcon = useCallback((type: string): string => {
    const icons = {
      truck: '🚛',
      excavator: '🏗️',
      drill: '⚒️',
      conveyor: '📦',
      processing: '🏭'
    };
    return icons[type as keyof typeof icons] || '📍';
  }, []);

  const drawMiningBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Mine background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f4f0');
    gradient.addColorStop(1, '#e8f5e8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Mining pits
    ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.beginPath();
    ctx.ellipse(width * 0.2, height * 0.3, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(width * 0.8, height * 0.7, 70, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Processing plant area
    ctx.fillStyle = 'rgba(128, 128, 128, 0.4)';
    ctx.fillRect(width * 0.45, height * 0.45, 80, 60);
    
    // Roads
    ctx.strokeStyle = 'rgba(105, 105, 105, 0.6)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.lineTo(width, height * 0.4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.3, 0);
    ctx.lineTo(width * 0.7, height);
    ctx.stroke();
  }, []);

  const drawAssetTrail = useCallback((ctx: CanvasRenderingContext2D, asset: AdvancedAsset, width: number, height: number) => {
    if (asset.trail.length < 2) return;

    ctx.strokeStyle = getStatusColor(asset.status, 0.3);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    asset.trail.forEach((point, index) => {
      const x = (point.x / 100) * width;
      const y = (point.y / 100) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }, [getStatusColor]);

  const drawAsset = useCallback((ctx: CanvasRenderingContext2D, asset: AdvancedAsset, width: number, height: number) => {
    const x = (asset.x / 100) * width;
    const y = (asset.y / 100) * height;
    const size = 20;

    // Asset shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Asset body
    ctx.fillStyle = getStatusColor(asset.status);
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Asset border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Asset icon
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getAssetIcon(asset.type), x, y);

    // Status indicator
    ctx.fillStyle = getStatusColor(asset.status);
    ctx.beginPath();
    ctx.arc(x + size / 2 - 2, y - size / 2 + 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // Selection highlight
    if (selectedAsset?.id === asset.id) {
      ctx.strokeStyle = '#0066ff';
      ctx.lineWidth = 4;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [getStatusColor, getAssetIcon, selectedAsset]);

  const drawTelemetryOverlay = useCallback((ctx: CanvasRenderingContext2D, asset: AdvancedAsset, width: number, height: number) => {
    const x = (asset.x / 100) * width;
    const y = (asset.y / 100) * height;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + 25, y - 20, 120, 40);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    let lineY = y - 15;
    Object.entries(asset.telemetry).slice(0, 2).forEach(([key, value]) => {
      const displayValue = typeof value === 'number' ? value.toFixed(1) : value;
      ctx.fillText(`${key}: ${displayValue}`, x + 30, lineY);
      lineY += 12;
    });
  }, []);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2 + panOffset.x, canvas.height / 2 + panOffset.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Draw mining site background
      drawMiningBackground(ctx, canvas.width, canvas.height);

      // Draw asset trails
      if (showTrails) {
        assets.forEach(asset => drawAssetTrail(ctx, asset, canvas.width, canvas.height));
      }

      // Draw assets
      assets.forEach(asset => drawAsset(ctx, asset, canvas.width, canvas.height));

      // Draw telemetry overlays
      if (showTelemetry) {
        assets.forEach(asset => drawTelemetryOverlay(ctx, asset, canvas.width, canvas.height));
      }

      ctx.restore();
    };

    draw();

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(() => {
        draw();
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [assets, zoom, panOffset, showTrails, showTelemetry, isPlaying, selectedAsset, drawMiningBackground, drawAssetTrail, drawAsset, drawTelemetryOverlay, getStatusColor, getAssetIcon]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check for asset clicks
    const clickedAsset = assets.find(asset => {
      const x = ((asset.x / 100) * canvas.width + canvas.width / 2 + panOffset.x) * zoom - canvas.width / 2;
      const y = ((asset.y / 100) * canvas.height + canvas.height / 2 + panOffset.y) * zoom - canvas.height / 2;
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      return distance < 15;
    });

    if (clickedAsset) {
      setSelectedAsset(clickedAsset);
      onAssetClick?.(clickedAsset);
    } else {
      setSelectedAsset(null);
      setIsDragging(true);
      setLastMousePos({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const deltaX = mouseX - lastMousePos.x;
    const deltaY = mouseY - lastMousePos.y;

    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * zoomFactor)));
  };

  const resetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className={`${className} relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Play className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        
        <button
          onClick={() => setShowTrails(!showTrails)}
          className={`p-2 backdrop-blur-sm rounded-lg shadow-lg transition-colors ${
            showTrails 
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300'
          }`}
          title="Toggle Trails"
        >
          <Eye className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setShowTelemetry(!showTelemetry)}
          className={`p-2 backdrop-blur-sm rounded-lg shadow-lg transition-colors ${
            showTelemetry 
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300'
          }`}
          title="Toggle Telemetry"
        >
          {showTelemetry ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
        
        <button
          onClick={resetView}
          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Connection Status */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <div className={`w-2 h-2 rounded-full ${isConnectedToThingsBoard ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {isConnectedToThingsBoard ? 'ThingsBoard Connected' : 'Demo Mode'}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Asset Details Panel */}
      {selectedAsset && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedAsset.name}
            </h3>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedAsset.status).replace('rgba', 'bg').replace(/,.*/, '')}`}></div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-400">Type:</span>
              <span className="ml-2 text-gray-900 dark:text-white capitalize">{selectedAsset.type}</span>
            </div>
            
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-400">Status:</span>
              <span className="ml-2 text-gray-900 dark:text-white capitalize">{selectedAsset.status}</span>
            </div>
            
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-400">Position:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {selectedAsset.x.toFixed(1)}, {selectedAsset.y.toFixed(1)}
              </span>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Telemetry:</div>
              {Object.entries(selectedAsset.telemetry).map(([key, value]) => (
                <div key={key} className="text-sm flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                  <span className="text-gray-900 dark:text-white">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t">
              Last updated: {selectedAsset.lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">Controls:</div>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div>🖱️ Click: Select asset</div>
          <div>🖱️ Drag: Pan view</div>
          <div>⚙️ Scroll: Zoom</div>
          <div>▶️ Play/Pause: Animation</div>
        </div>
      </div>
    </div>
  );
};
