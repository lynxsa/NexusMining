import React, { useState, useEffect } from 'react';
import { 
  CloudIcon,
  SunIcon,
  EyeIcon,
  BeakerIcon as ThermometerIcon,
  ArrowPathIcon as WindIcon
} from '@heroicons/react/24/outline';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  alerts: string[];
}

// Mock weather data for South African mining location
const mockWeatherData: WeatherData = {
  location: 'Rustenburg Mining Site',
  temperature: 18,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  visibility: 8,
  pressure: 1013,
  uvIndex: 6,
  alerts: ['High UV Warning', 'Wind Advisory']
};

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      // In real app, fetch weather data from API
      setWeather({
        ...mockWeatherData,
        temperature: mockWeatherData.temperature + (Math.random() - 0.5) * 4
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <SunIcon className="h-8 w-8 text-yellow-500" />;
      case 'rainy':
        return <CloudIcon className="h-8 w-8 text-blue-500" />;
      default:
        return <CloudIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 25) return 'text-red-600 dark:text-red-400';
    if (temp > 15) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  const getSafetyRecommendation = () => {
    if (weather.temperature > 30) {
      return 'High temperature - Increase water breaks, monitor heat stress';
    }
    if (weather.windSpeed > 15) {
      return 'High winds - Suspend crane operations, secure loose materials';
    }
    if (weather.visibility < 5) {
      return 'Low visibility - Reduce speed limits, use warning lights';
    }
    if (weather.uvIndex > 7) {
      return 'High UV - Mandatory sun protection, limit outdoor exposure';
    }
    return 'Weather conditions normal - Standard safety protocols';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weather Conditions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {weather.location} • {currentTime.toLocaleTimeString('en-ZA', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
      </div>

      <div className="p-6">
        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className={`text-4xl font-bold ${getTemperatureColor(weather.temperature)}`}>
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {weather.condition}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Feels like {Math.round(weather.temperature + 2)}°C
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Humidity {weather.humidity}%
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <WindIcon className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {weather.windSpeed} km/h
              </div>
              <div className="text-xs text-gray-500">Wind Speed</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {weather.visibility} km
              </div>
              <div className="text-xs text-gray-500">Visibility</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThermometerIcon className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {weather.pressure} hPa
              </div>
              <div className="text-xs text-gray-500">Pressure</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <SunIcon className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                UV {weather.uvIndex}
              </div>
              <div className="text-xs text-gray-500">UV Index</div>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        {weather.alerts.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Active Alerts
            </div>
            <div className="space-y-1">
              {weather.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm text-yellow-800 dark:text-yellow-200"
                >
                  {alert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Recommendation */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
            Safety Recommendation
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {getSafetyRecommendation()}
          </div>
        </div>

        {/* 24hr Forecast Preview */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            24-Hour Forecast
          </div>
          <div className="flex justify-between text-xs">
            {['6h', '12h', '18h', '24h'].map((time, index) => (
              <div key={time} className="text-center">
                <div className="text-gray-500 dark:text-gray-400">{time}</div>
                <div className="my-1">
                  {index % 2 === 0 ? (
                    <SunIcon className="h-4 w-4 mx-auto text-yellow-500" />
                  ) : (
                    <CloudIcon className="h-4 w-4 mx-auto text-gray-500" />
                  )}
                </div>
                <div className="text-gray-900 dark:text-white">
                  {Math.round(weather.temperature + (Math.random() - 0.5) * 6)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
