import React from 'react';
import { SavedToysList } from './saved/SavedToysList';
import { Toy } from '../types/toy';

interface SavedToysProps {
  toys: Toy[];
  onStartChat: (toy: Toy) => void;
}

export function SavedToys({ toys, onStartChat }: SavedToysProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Toys</h2>
      <SavedToysList toys={toys} onStartChat={onStartChat} />
    </div>
  );
}