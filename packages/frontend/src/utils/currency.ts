export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate relative to ZAR
}

export const currencies: Currency[] = [
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 1.0 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.054 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.049 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.042 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.081 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.073 },
];

export const formatCurrency = (amount: number, currencyCode: string = 'ZAR'): string => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  const convertedAmount = amount * currency.rate;
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount).replace(currencyCode, currency.symbol);
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
  return (amount / fromRate) * toRate;
};

// South African mining locations
export const miningLocations = [
  'Witwatersrand Basin - Gauteng',
  'Bushveld Complex - Limpopo',
  'Phalaborwa - Limpopo',
  'Rustenburg - North West',
  'Kimberley - Northern Cape',
  'Kathu - Northern Cape',
  'Welkom - Free State',
  'Klerksdorp - North West',
  'Carletonville - Gauteng',
  'Orkney - North West'
];

// South African mining equipment suppliers
export const southAfricanSuppliers = [
  'Bell Equipment - Richards Bay, KZN',
  'Barloworld Equipment - Johannesburg, GP',
  'Komatsu South Africa - Johannesburg, GP',
  'Caterpillar Africa - Johannesburg, GP',
  'Murray & Roberts - Johannesburg, GP',
  'DRA Global - Cape Town, WC',
  'Exxaro Resources - Pretoria, GP',
  'African Mining Supplies - Durban, KZN'
];
