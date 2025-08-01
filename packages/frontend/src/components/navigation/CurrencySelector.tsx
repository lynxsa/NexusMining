import React, { useState } from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const CurrencySelector: React.FC = () => {
  const { currentCurrency, setCurrency, availableCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currency: typeof currentCurrency) => {
    setCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentCurrency.symbol} {currentCurrency.code}
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {availableCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentCurrency.code === currency.code
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{currency.symbol} {currency.code}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {currency.name}
                    </span>
                  </div>
                  {currentCurrency.code !== currency.code && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      1 ZAR = {currency.rate.toFixed(3)} {currency.code}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
