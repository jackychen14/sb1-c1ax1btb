import { useState } from 'react';

export function useImageCarousel(totalImages: number) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return {
    currentImageIndex,
    nextImage,
    prevImage,
  };
}