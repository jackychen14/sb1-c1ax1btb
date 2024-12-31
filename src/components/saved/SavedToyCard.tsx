import React from 'react';
import { MessageCircle, MapPin, Trash2 } from 'lucide-react';
import { Toy } from '../../types/toy';

interface SavedToyCardProps {
  toy: Toy;
  onStartChat: (toy: Toy) => void;
  onRemove: (toyId: string) => void;
}

export function SavedToyCard({ toy, onStartChat, onRemove }: SavedToyCardProps) {
  const handleRemove = () => {
    if (confirm('Are you sure you want to remove this toy from your saved items?')) {
      onRemove(toy.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex gap-4">
        <img
          src={toy.images[0].url}
          alt={toy.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{toy.name}</h3>
          <p className="text-sm text-gray-600">{toy.condition}</p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin size={16} className="mr-1" />
            {toy.owner.location}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onStartChat(toy)}
            className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200"
            title="Start chat"
          >
            <MessageCircle size={20} />
          </button>
          <button
            onClick={handleRemove}
            className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
            title="Remove from saved"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}