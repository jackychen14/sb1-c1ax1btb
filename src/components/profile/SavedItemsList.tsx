import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMatch } from '../../context/MatchContext';
import { mockToys } from '../../data/mockToys';

export function SavedItemsList() {
  const { user } = useAuth();
  const { matches } = useMatch();

  // Filter toys that the user has liked
  const savedToys = mockToys.filter(toy => 
    toy.likes.includes(user?.id || '') || 
    matches.some(match => match.userId === user?.id && match.toyId === toy.id)
  );

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="text-red-500" size={20} />
        Saved Items
      </h2>
      
      <div className="space-y-3">
        {savedToys.map(toy => (
          <div key={toy.id} className="bg-white rounded-lg shadow-sm p-3 flex gap-3">
            <img
              src={toy.images[0].url}
              alt={toy.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{toy.name}</h3>
              <p className="text-sm text-gray-500">{toy.condition}</p>
            </div>
          </div>
        ))}
        
        {savedToys.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No saved items yet
          </p>
        )}
      </div>
    </div>
  );
}