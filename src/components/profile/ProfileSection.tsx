import React, { useState } from 'react';
import { User, Coins, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { ProfileCard } from './ProfileCard';
import { PostedToys } from './PostedToys';
import { ExchangedItems } from './ExchangedItems';
import { TopUpCredits } from '../credits/TopUpCredits';
import { LanguageSelector } from '../auth/LanguageSelector';

export function ProfileSection() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showTopUp, setShowTopUp] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
        <LanguageSelector />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <ProfileCard
            icon={<User className="text-blue-500" size={24} />}
            label={t('profile.name')}
            value={user.name}
          />
          
          <ProfileCard
            icon={<Mail className="text-purple-500" size={24} />}
            label={t('profile.email')}
            value={user.email}
          />
          
          <ProfileCard
            icon={<Coins className="text-yellow-500" size={24} />}
            label={t('credits.title')}
            value={t('credits.current', { count: user.credits })}
            action={t('credits.topUp')}
            onAction={() => setShowTopUp(true)}
          />
        </div>

        <div className="border-t pt-6">
          <PostedToys />
        </div>

        <div className="border-t pt-6">
          <ExchangedItems />
        </div>
      </div>

      {showTopUp && <TopUpCredits onClose={() => setShowTopUp(false)} />}
    </div>
  );
}