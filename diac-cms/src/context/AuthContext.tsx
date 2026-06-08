import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { getCurrentUser, login as storeLogin, logout as storeLogout, initializeData } from '../store/dataStore';

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeData();
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const login = (userId: string, password: string): boolean => {
    const loggedIn = storeLogin(userId, password);
    if (loggedIn) {
      setUser(getCurrentUser());
      return true;
    }
    return false;
  };

  const logout = () => {
    storeLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
