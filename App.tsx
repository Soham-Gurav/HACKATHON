import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CarbonFootprint from './components/CarbonFootprint';
import CarbonTips from './components/CarbonTips';
import HabitAnalysis from './components/HabitAnalysis';
import { Transaction } from './types';

function Dashboard() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <HabitAnalysis transactions={transactions} />
            <TransactionList transactions={transactions} />
          </div>
          <div className="space-y-8">
            <CarbonFootprint transactions={transactions} />
            <CarbonTips transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}