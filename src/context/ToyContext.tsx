import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toy } from '../types/toy';
import { useAuth } from './AuthContext';
import { fetchToys, fetchUserToys, insertToy, updateToy, deleteToy } from '../services/database/toys.service';

interface ToyContextType {
  toys: Toy[];
  userToys: Toy[];
  addToy: (toy: Toy) => Promise<void>;
  updateToy: (id: string, updates: Partial<Toy>) => Promise<void>;
  deleteToy: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ToyContext = createContext<ToyContextType | undefined>(undefined);

export function ToyProvider({ children }: { children: React.ReactNode }) {
  const [toys, setToys] = useState<Toy[]>([]);
  const [userToys, setUserToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load all available toys
  useEffect(() => {
    const loadToys = async () => {
      setLoading(true);
      try {
        const data = await fetchToys();
        setToys(data);
        setError(null);
      } catch (error) {
        console.error('Error loading toys:', error);
        setError('Failed to load toys');
      } finally {
        setLoading(false);
      }
    };

    loadToys();
  }, []);

  // Load user's toys when authenticated
  useEffect(() => {
    const loadUserToys = async () => {
      if (!user) {
        setUserToys([]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchUserToys(user.id);
        setUserToys(data);
        setError(null);
      } catch (error) {
        console.error('Error loading user toys:', error);
        setError('Failed to load your toys');
      } finally {
        setLoading(false);
      }
    };

    loadUserToys();
  }, [user]);

  const addToy = async (toy: Toy) => {
    try {
      await insertToy(toy);
      const [allToys, userToys] = await Promise.all([
        fetchToys(),
        user ? fetchUserToys(user.id) : Promise.resolve([])
      ]);
      setToys(allToys);
      setUserToys(userToys);
      setError(null);
    } catch (error) {
      console.error('Error adding toy:', error);
      throw error;
    }
  };

  const handleUpdateToy = async (id: string, updates: Partial<Toy>) => {
    try {
      await updateToy(id, updates);
      const [allToys, userToys] = await Promise.all([
        fetchToys(),
        user ? fetchUserToys(user.id) : Promise.resolve([])
      ]);
      setToys(allToys);
      setUserToys(userToys);
      setError(null);
    } catch (error) {
      console.error('Error updating toy:', error);
      throw error;
    }
  };

  const handleDeleteToy = async (id: string) => {
    try {
      await deleteToy(id);
      const [allToys, userToys] = await Promise.all([
        fetchToys(),
        user ? fetchUserToys(user.id) : Promise.resolve([])
      ]);
      setToys(allToys);
      setUserToys(userToys);
      setError(null);
    } catch (error) {
      console.error('Error deleting toy:', error);
      throw error;
    }
  };

  return (
    <ToyContext.Provider 
      value={{ 
        toys, 
        userToys,
        addToy, 
        updateToy: handleUpdateToy, 
        deleteToy: handleDeleteToy, 
        loading,
        error
      }}
    >
      {children}
    </ToyContext.Provider>
  );
}

export const useToys = () => {
  const context = useContext(ToyContext);
  if (!context) {
    throw new Error('useToys must be used within a ToyProvider');
  }
  return context;
};