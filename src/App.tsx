import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToyProvider } from './context/ToyContext';
import { MatchProvider } from './context/MatchContext';
import { AppContent } from './components/AppContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BetaBanner } from './components/BetaBanner';
import { FeedbackWidget } from './components/feedback/FeedbackWidget';

export default function App() {
  return (
    <ErrorBoundary>
      <BetaBanner />
      <AuthProvider>
        <ToyProvider>
          <MatchProvider>
            <AppContent />
            <FeedbackWidget />
          </MatchProvider>
        </ToyProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}