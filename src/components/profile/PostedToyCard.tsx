import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Toy } from '../../types/toy';
import { EditToyModal } from './EditToyModal';
import { useToys } from '../../context/ToyContext';

interface PostedToyCardProps {
  toy: Toy;
}

export function PostedToyCard({ toy }: PostedToyCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteToy } = useToys();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this toy?')) {
      deleteToy(toy.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4">
          <img
            src={toy.images[0].url}
            alt={toy.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{toy.name}</h3>
            <p className="text-sm text-gray-600">{toy.condition}</p>
            <p className="text-sm text-gray-500">Age: {toy.ageRange}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 flex items-center gap-1 hover:text-blue-600"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-sm text-red-500 flex items-center gap-1 hover:text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditToyModal toy={toy} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}