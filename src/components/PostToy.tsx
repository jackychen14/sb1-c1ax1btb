import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageUpload } from './ImageUpload';
import { LocationInput } from './location/LocationInput';
import { ToyImage } from '../types/toy';
import { Location } from '../types/location';
import { useToyPosting } from '../hooks/useToyPosting';

export function PostToy() {
  const { t } = useTranslation();
  const { postToy, isSubmitting, error } = useToyPosting();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ageRange: '',
    condition: 'New' as const,
  });
  const [images, setImages] = useState<ToyImage[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postToy(formData, images, location!);
      
      // Reset form on success
      setFormData({
        name: '',
        description: '',
        ageRange: '',
        condition: 'New',
      });
      setImages([]);
      setLocation(null);

      alert(t('toys.post.success'));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to post toy');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t('toys.post.title')}</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{t('labels.photos')}</h3>
            <ImageUpload images={images} onImagesChange={setImages} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{t('labels.location')}</h3>
            <LocationInput
              value={location}
              onChange={setLocation}
              placeholder={t('toys.post.locationPlaceholder')}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{t('labels.details')}</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('labels.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('ageRange')}
              </label>
              <input
                type="text"
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                placeholder={t('toys.post.ageRangePlaceholder')}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('labels.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('labels.condition')}
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="New">{t('toys.condition.new')}</option>
                <option value="Like New">{t('toys.condition.likeNew')}</option>
                <option value="Good">{t('toys.condition.good')}</option>
                <option value="Fair">{t('toys.condition.fair')}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? t('common.loading') : t('post')}
          </button>
        </form>
      </div>
    </div>
  );
}