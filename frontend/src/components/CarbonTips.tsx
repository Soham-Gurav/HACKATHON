import React, { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../data/categories';
import { TIPS_DATABASE } from '../data/tips';

interface CarbonTipsProps {
  transactions: Transaction[];
}

export default function CarbonTips({ transactions }: CarbonTipsProps) {
  const getHighestImpactCategories = useMemo(() => {
    const categoryImpact = transactions.reduce((acc, transaction) => {
      const category = CATEGORIES.find((c) => c.name === transaction.category);
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + 
          (transaction.amount * category.carbonMultiplier);
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryImpact)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([category]) => category);
  }, [transactions]);

  const getPersonalizedTips = () => {
    if (transactions.length === 0) {
      return ["Start tracking your spending to get personalized carbon reduction tips!"];
    }

    const tips = getHighestImpactCategories.flatMap(category => {
      const categoryTips = TIPS_DATABASE[category as keyof typeof TIPS_DATABASE];
      return categoryTips.slice(0, 2);
    });

    return tips;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800">AI Tips</h2>
      </div>

      <div className="space-y-4">
        {getHighestImpactCategories.length > 0 && (
          <p className="text-sm text-gray-600">
            Based on your spending, here are some tips to reduce your carbon footprint
            in your highest-impact categories:
            {' '}
            <span className="font-medium">
              {getHighestImpactCategories.join(' and ')}
            </span>
          </p>
        )}

        <div className="space-y-3">
          {getPersonalizedTips().map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-600 mt-1">💡</span>
              <p className="text-sm text-gray-800">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}