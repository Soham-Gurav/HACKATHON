import { Transaction } from '../types';
import { CATEGORIES } from '../data/categories';

export interface HabitAnalysis {
  frequentCategories: Array<{ category: string; frequency: number }>;
  spendingTrends: {
    highestSpending: string;
    averageTransaction: number;
    totalSpent: number;
  };
  carbonImpact: {
    highestImpact: string;
    totalImpact: number;
    averagePerTransaction: number;
  };
}

export function analyzeHabits(transactions: Transaction[]): HabitAnalysis {
  if (transactions.length === 0) {
    return {
      frequentCategories: [],
      spendingTrends: {
        highestSpending: '',
        averageTransaction: 0,
        totalSpent: 0,
      },
      carbonImpact: {
        highestImpact: '',
        totalImpact: 0,
        averagePerTransaction: 0,
      },
    };
  }

  // Analyze category frequency
  const categoryCount = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const frequentCategories = Object.entries(categoryCount)
    .map(([category, count]) => ({
      category,
      frequency: (count / transactions.length) * 100,
    }))
    .sort((a, b) => b.frequency - a.frequency);

  // Analyze spending trends
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = totalSpent / transactions.length;
  
  const spendingByCategory = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestSpending = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)[0][0];

  // Analyze carbon impact
  const carbonByCategory = transactions.reduce((acc, t) => {
    const category = CATEGORIES.find(c => c.name === t.category);
    if (category) {
      acc[t.category] = (acc[t.category] || 0) + (t.amount * category.carbonMultiplier);
    }
    return acc;
  }, {} as Record<string, number>);

  const totalImpact = Object.values(carbonByCategory).reduce((sum, v) => sum + v, 0);
  const highestImpact = Object.entries(carbonByCategory)
    .sort(([, a], [, b]) => b - a)[0][0];

  return {
    frequentCategories,
    spendingTrends: {
      highestSpending,
      averageTransaction,
      totalSpent,
    },
    carbonImpact: {
      highestImpact,
      totalImpact,
      averagePerTransaction: totalImpact / transactions.length,
    },
  };
}