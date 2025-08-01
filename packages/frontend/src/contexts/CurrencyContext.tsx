import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { currencies } from '../utils/currency';
import type { Currency } from '../utils/currency';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currencies[0]); // Default to ZAR

  const setCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currentCurrency, 
        setCurrency, 
        availableCurrencies: currencies 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
