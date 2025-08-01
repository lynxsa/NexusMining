import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';

interface ProductionData {
  time: string;
  gold: number;
  platinum: number;
  target: number;
}

const generateMockData = (): ProductionData[] => {
  const data: ProductionData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
      gold: Math.floor(Math.random() * 50) + 150,
      platinum: Math.floor(Math.random() * 30) + 80,
      target: 200
    });
  }
  
  return data;
};

export const ProductionChart: React.FC = () => {
  const [data, setData] = useState<ProductionData[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentCurrency } = useCurrency();

  useEffect(() => {
    setData(generateMockData());
    
    // Update data every 5 minutes in real app
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setData(generateMockData());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const totalProduction = data.reduce((sum, item) => sum + item.gold + item.platinum, 0);
  const targetProduction = data.length * 200;
  const efficiency = ((totalProduction / targetProduction) * 100).toFixed(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * currentCurrency.rate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Production Performance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last 24 hours - Updated {currentTime.toLocaleTimeString('en-ZA')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {efficiency}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Efficiency
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
            <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">Gold Output</div>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
              {data.reduce((sum, item) => sum + item.gold, 0).toLocaleString()} oz
            </div>
            <div className="text-xs text-yellow-700 dark:text-yellow-300">
              Value: {formatCurrency(data.reduce((sum, item) => sum + item.gold, 0) * 2000)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/20 dark:to-gray-600/20 p-4 rounded-lg">
            <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">Platinum Output</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {data.reduce((sum, item) => sum + item.platinum, 0).toLocaleString()} oz
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">
              Value: {formatCurrency(data.reduce((sum, item) => sum + item.platinum, 0) * 1000)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="text-sm text-green-800 dark:text-green-200 font-medium">Total Value</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {formatCurrency(
                data.reduce((sum, item) => sum + item.gold * 2000 + item.platinum * 1000, 0)
              )}
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              24hr Revenue
            </div>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Hourly Output (Last 24h)</span>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Gold</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <span>Platinum</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Target</span>
              </div>
            </div>
          </div>
          
          {/* Simplified bar chart */}
          <div className="h-40 flex items-end justify-between space-x-1">
            {data.slice(-12).map((item, index) => {
              const maxValue = Math.max(...data.map(d => d.gold + d.platinum + d.target));
              const goldHeight = (item.gold / maxValue) * 100;
              const platinumHeight = (item.platinum / maxValue) * 100;
              const targetHeight = (item.target / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="flex items-end space-x-0.5 h-32">
                    <div 
                      className="w-2 bg-yellow-500 rounded-t"
                      style={{ height: `${goldHeight}%` }}
                      title={`Gold: ${item.gold} oz`}
                    ></div>
                    <div 
                      className="w-2 bg-gray-500 rounded-t"
                      style={{ height: `${platinumHeight}%` }}
                      title={`Platinum: ${item.platinum} oz`}
                    ></div>
                    <div 
                      className="w-1 bg-blue-300 rounded-t opacity-60"
                      style={{ height: `${targetHeight}%` }}
                      title={`Target: ${item.target} oz`}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 transform rotate-45 origin-left">
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Production Status */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Current Status
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {efficiency}% of target achieved
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Active Production
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
