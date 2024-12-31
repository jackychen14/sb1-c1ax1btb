import React, { createContext, useContext, useState } from 'react';
import { Match } from '../types/toy';
import { useLikes } from '../hooks/useLikes';
import { mockToys } from '../data/mockToys';

interface MatchContextType {
  matches: Match[];
  addLike: (userId: string, toyId: string, ownerToyId: string) => Match | null;
  checkMatch: (userId: string, toyId: string) => Match | null;
  getUserMatches: (userId: string) => Match[];
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const { addLike: registerLike, checkMutualLike, getUserLikes } = useLikes();

  const addLike = (userId: string, toyId: string, ownerToyId: string) => {
    const toyOwner = mockToys.find(t => t.id === toyId)?.owner.id;
    if (!toyOwner) return null;

    registerLike(userId, toyId);

    // Check if there's a mutual like
    if (checkMutualLike(userId, ownerToyId, toyOwner, toyId)) {
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        toyId: ownerToyId,
        userId,
        matchedUserId: toyOwner,
        matchedToyId: toyId,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      setMatches(prev => [...prev, newMatch]);
      return newMatch;
    }

    return null;
  };

  const checkMatch = (userId: string, toyId: string) => {
    return matches.find(
      match =>
        (match.userId === userId && match.toyId === toyId) ||
        (match.matchedUserId === userId && match.matchedToyId === toyId)
    ) || null;
  };

  const getUserMatches = (userId: string) => {
    return matches.filter(
      match => match.userId === userId || match.matchedUserId === userId
    );
  };

  return (
    <MatchContext.Provider value={{ matches, addLike, checkMatch, getUserMatches }}>
      {children}
    </MatchContext.Provider>
  );
}

// Export the hook
export const useMatch = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};