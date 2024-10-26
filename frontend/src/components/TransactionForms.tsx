import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction } from '../types';
import { CATEGORIES } from '../data/categories';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
      description
    };
    onAddTransaction(transaction);
    setAmount('');
    setDescription('');
  };
/*
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <PlusCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Add Transaction</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
            placeholder="Enter amount"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
            placeholder="Enter description"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
*/
}