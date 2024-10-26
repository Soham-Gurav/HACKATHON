import React from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../data/categories';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        ) : (
          transactions.map((transaction) => {
            const category = CATEGORIES.find((c) => c.name === transaction.category);
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category?.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}