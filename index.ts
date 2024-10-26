export interface Transaction {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  export interface Category {
    name: string;
    carbonMultiplier: number;
    icon: string;
  }
  
  export interface CarbonMetrics {
    total: number;
    byCategory: Record<string, number>;
  }