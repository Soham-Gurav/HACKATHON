import React, { createContext, useContext, useState, ReactNode } from 'react';
import { database, DBUser } from '../database';

interface AuthContextType {
  user: DBUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DBUser | null>(null);

  const login = async (email: string, password: string) => {
    const validatedUser = database.validateUser(email, password);
    if (!validatedUser) {
      throw new Error('Invalid credentials');
    }
    setUser(validatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}