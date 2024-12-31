import React from 'react';
import { BookmarkX } from 'lucide-react';
import { SavedToyCard } from './SavedToyCard';
import { Toy } from '../../types/toy';
import { useToys } from '../../context/ToyContext';

interface SavedToysListProps {
  toys: Toy[];
  onStartChat: (toy: Toy) => void;
}

export function SavedToysList({ toys, onStartChat }: SavedToysListProps) {
  const { updateToy } = useToys();

  const handleRemove = (toyId: string) => {
    const toy = toys.find(t => t.id === toyId);
    if (toy) {
      updateToy(toyId, { ...toy, likes: [] });
    }
  };

  if (toys.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <BookmarkX className="mx-auto mb-2" size={32} />
        <p>No saved toys yet</p>
        <p className="text-sm">Start saving toys you're interested in!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {toys.map((toy) => (
        <SavedToyCard
          key={toy.id}
          toy={toy}
          onStartChat={onStartChat}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}