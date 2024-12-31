import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.dir() === 'rtl',
  };
}