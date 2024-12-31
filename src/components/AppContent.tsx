import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthForm } from './auth/AuthForm';
import { Navigation } from './Navigation';
import { ToyDiscovery } from './ToyDiscovery';
import { SavedToys } from './SavedToys';
import { ChatList } from './chat/ChatList';
import { PostToy } from './PostToy';
import { ProfileSection } from './profile/ProfileSection';
import { Header } from './Header';
import { useToys } from '../context/ToyContext';

export function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const { toys } = useToys();
  const [activeTab, setActiveTab] = useState('discover');

  if (!isAuthenticated || !user) {
    return <AuthForm />;
  }

  const savedToys = toys.filter(toy => 
    toy && toy.likes && toy.likes.includes(user.id)
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <ToyDiscovery />;
      case 'saved':
        return <SavedToys toys={savedToys} onStartChat={() => setActiveTab('chats')} />;
      case 'chats':
        return <ChatList />;
      case 'post':
        return <PostToy />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <ToyDiscovery />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pb-16">
        {renderContent()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}