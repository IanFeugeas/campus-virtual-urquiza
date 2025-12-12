import { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { apiClient } from '../../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUserFromToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token); 
        if (decoded) {
            setUser(decoded); 
        } else {
            localStorage.removeItem('token');
        }
      } catch (e) {
        console.error("Token inválido o expirado:", e);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await apiClient('auth/login', {
          method: 'POST',
          body: { email, password }
      });
      
      localStorage.setItem('token', data.token);
      
      loadUserFromToken(); 
      
      return { success: true, user: data.usuario }; 
      
    } catch (error) {
      setLoading(false);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, isAdmin: user?.rol === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);