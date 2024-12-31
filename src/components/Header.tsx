import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CreditDisplay } from './CreditDisplay';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-10 bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <CreditDisplay credits={user?.credits ?? 0} />
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <span className="text-sm font-medium">{user?.name}</span>
          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-gray-100"
            title={t('auth.logout')}
          >
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}