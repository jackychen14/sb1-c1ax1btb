import React from 'react';
import { Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToys } from '../../context/ToyContext';
import { PostedToyCard } from './PostedToyCard';

export function PostedToys() {
  const { t } = useTranslation();
  const { userToys, loading, error } = useToys();

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Package className="text-indigo-500" size={20} />
        {t('profile.postedToys.title')}
      </h2>
      
      <div className="space-y-4">
        {userToys.map(toy => (
          <PostedToyCard key={toy.id} toy={toy} />
        ))}
        
        {userToys.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            <p>{t('profile.postedToys.empty')}</p>
            <p className="text-sm mt-1">{t('profile.postedToys.emptyHint')}</p>
          </div>
        )}
      </div>
    </div>
  );
}