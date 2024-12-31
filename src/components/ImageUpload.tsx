import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { ToyImage } from '../types/toy';

interface ImageUploadProps {
  images: ToyImage[];
  onImagesChange: (images: ToyImage[]) => void;
}

export function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    // In a real app, this would upload to a server
    // Here we're just creating object URLs
    const newImages: ToyImage[] = files.map((file) => ({
      id: 'img_' + Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      isPrimary: images.length === 0, // First image is primary by default
    }));

    onImagesChange([...images, ...newImages]);
    setError(null);
  };

  const removeImage = (id: string) => {
    const newImages = images.filter((img) => img.id !== id);
    if (newImages.length > 0 && !newImages.some((img) => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }
    onImagesChange(newImages);
  };

  const setPrimaryImage = (id: string) => {
    const newImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt="Toy"
              className={`w-full h-32 object-cover rounded-lg ${
                image.isPrimary ? 'ring-2 ring-blue-500' : ''
              }`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
              <button
                onClick={() => setPrimaryImage(image.id)}
                className="p-1 bg-blue-500 text-white rounded-full"
                title="Set as primary"
              >
                ★
              </button>
              <button
                onClick={() => removeImage(image.id)}
                className="p-1 bg-red-500 text-white rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
        {images.length < 5 && (
          <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-500">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <Upload className="mx-auto text-gray-400" size={24} />
              <span className="text-sm text-gray-500">Upload Image</span>
            </div>
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-sm text-gray-500">
        Upload up to 5 images. First image will be the primary image.
      </p>
    </div>
  );
}