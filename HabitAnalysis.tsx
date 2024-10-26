import React from 'react';
import { LineChart, TrendingUp, DollarSign } from 'lucide-react';
import { Transaction } from '../types';
import { analyzeHabits } from '../utils/habitAnalysis';

interface HabitAnalysisProps {
  transactions: Transaction[];
}

export default function HabitAnalysis({ transactions }: HabitAnalysisProps) {
  const habits = analyzeHabits(transactions);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Spending Habits</h2>
      </div>

      <div className="space-y-6">
        {/* Frequent Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Most Frequent Categories
          </h3>
          <div className="space-y-2">
            {habits.frequentCategories.slice(0, 3).map(({ category, frequency }) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${frequency}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {frequency.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Overview */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Spending Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Highest Spending</p>
              <p className="font-medium text-gray-900">{habits.spendingTrends.highestSpending}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Transaction</p>
              <p className="font-medium text-gray-900">
                ${habits.spendingTrends.averageTransaction.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Impact Insight */}
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-gray-800">
            <span className="font-medium">Environmental Impact Insight:</span>{' '}
            Your highest carbon impact comes from{' '}
            <span className="font-medium text-amber-700">
              {habits.carbonImpact.highestImpact}
            </span>{' '}
            spending. Each transaction contributes an average of{' '}
            <span className="font-medium text-amber-700">
              {habits.carbonImpact.averagePerTransaction.toFixed(2)} kg
            </span>{' '}
            of CO₂.
          </p>
        </div>
      </div>
    </div>
  );
}