import React, { useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Toy } from '../types/toy';
import { useImageCarousel } from '../hooks/useImageCarousel';
import { useAuth } from '../context/AuthContext';
import { useMatch } from '../context/MatchContext';
import { useToys } from '../context/ToyContext';
import { useSwipeCredits } from '../hooks/useSwipeCredits';
import { SubscriptionBanner } from './subscription/SubscriptionBanner';

interface ToyCardProps {
  toy: Toy;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function ToyCard({ toy, onSwipeLeft, onSwipeRight }: ToyCardProps) {
  const { currentImageIndex, nextImage, prevImage } = useImageCarousel(toy.images?.length || 0);
  const { user } = useAuth();
  const { addLike } = useMatch();
  const { toys, updateToy } = useToys();
  const { canSwipe, deductCredit } = useSwipeCredits();
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(false);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!user) return;

    if (!canSwipe) {
      setShowSubscriptionBanner(true);
      return;
    }

    const success = await deductCredit();
    if (!success) {
      setShowSubscriptionBanner(true);
      return;
    }

    if (direction === 'right') {
      const userPostedToy = toys.find(t => t.owner.id === user.id);
      if (!userPostedToy) {
        alert('You need to post a toy before you can like others!');
        return;
      }

      const updatedToy = {
        ...toy,
        likes: [...toy.likes, user.id]
      };
      updateToy(toy.id, updatedToy);

      const match = addLike(user.id, toy.id, userPostedToy.id);
      if (match) {
        alert("It's a match! You can now start chatting.");
      }
      onSwipeRight();
    } else {
      onSwipeLeft();
    }
  };

  if (!toy || !toy.images?.length) return null;

  return (
    <>
      <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image carousel */}
        <div className="relative">
          <img
            src={toy.images[currentImageIndex].url}
            alt={toy.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {toy.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Toy details */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{toy.name}</h2>
          <p className="text-gray-600 mb-2">{toy.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Age: {toy.ageRange}</span>
            <span>Condition: {toy.condition}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>Owner: {toy.owner.name}</p>
            <p>Location: {toy.owner.location}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-8 p-4 border-t">
          <button
            onClick={() => handleSwipe('left')}
            className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
            disabled={!canSwipe}
          >
            <X size={24} />
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
            disabled={!canSwipe}
          >
            <Heart size={24} />
          </button>
        </div>
      </div>

      {showSubscriptionBanner && (
        <div className="mt-4">
          <SubscriptionBanner onClose={() => setShowSubscriptionBanner(false)} />
        </div>
      )}
    </>
  );
}