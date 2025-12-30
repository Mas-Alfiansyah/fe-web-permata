import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

export type UserRole = 'super_admin' | 'instructor' | 'student';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persisted user
    const savedUser = localStorage.getItem('permata_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: '1',
      name: role === 'super_admin' ? 'Super Admin' : role === 'instructor' ? 'Budi Instructor' : 'Siti Student',
      email: `${role}@permata.com`,
      role: role,
    };
    setUser(mockUser);
    localStorage.setItem('permata_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('permata_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
