import React from 'react';
import { BarChart, Leaf } from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../data/categories';

interface CarbonFootprintProps {
  transactions: Transaction[];
}

export default function CarbonFootprint({ transactions }: CarbonFootprintProps) {
  const calculateCarbonFootprint = () => {
    return transactions.reduce((total, transaction) => {
      const category = CATEGORIES.find((c) => c.name === transaction.category);
      return total + (transaction.amount * (category?.carbonMultiplier || 0));
    }, 0);
  };

  const getCarbonByCategory = () => {
    return transactions.reduce((acc, transaction) => {
      const category = CATEGORIES.find((c) => c.name === transaction.category);
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + (transaction.amount * category.carbonMultiplier);
      }
      return acc;
    }, {} as Record<string, number>);
  };

  const carbonFootprint = calculateCarbonFootprint();
  const carbonByCategory = getCarbonByCategory();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Carbon Footprint</h2>
      </div>

      <div className="mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">
            {carbonFootprint.toFixed(2)} kg CO₂
          </p>
          <p className="text-sm text-gray-500">Total Carbon Footprint</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <BarChart className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-gray-700">By Category</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(carbonByCategory).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{CATEGORIES.find(c => c.name === category)?.icon}</span>
                <span className="text-sm text-gray-700">{category}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {amount.toFixed(2)} kg
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}