import { useState } from 'react';
import { Toy } from '../types/toy';

export function useLikes() {
  const [likes, setLikes] = useState<Map<string, Set<string>>>(new Map());

  const addLike = (userId: string, toyId: string) => {
    setLikes(prev => {
      const newLikes = new Map(prev);
      const userLikes = new Set(prev.get(userId) || []);
      userLikes.add(toyId);
      newLikes.set(userId, userLikes);
      return newLikes;
    });
  };

  const checkMutualLike = (user1Id: string, toy1Id: string, user2Id: string, toy2Id: string): boolean => {
    const user1Likes = likes.get(user1Id);
    const user2Likes = likes.get(user2Id);
    
    return Boolean(
      user1Likes?.has(toy2Id) && 
      user2Likes?.has(toy1Id)
    );
  };

  const getUserLikes = (userId: string): Set<string> => {
    return likes.get(userId) || new Set();
  };

  return {
    addLike,
    checkMutualLike,
    getUserLikes
  };
}