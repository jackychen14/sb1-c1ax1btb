import React from 'react';
import { Home, MessageCircle, BookmarkCheck, PlusCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'discover', icon: Home, label: 'Discover' },
    { id: 'saved', icon: BookmarkCheck, label: 'Saved' },
    { id: 'chats', icon: MessageCircle, label: 'Chats' },
    { id: 'post', icon: PlusCircle, label: 'Post' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around p-3">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center ${
              activeTab === id ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}