import React, { useState } from 'react';
import { FeedbackButton } from './FeedbackButton';
import { FeedbackChat } from './FeedbackChat';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FeedbackButton onClick={() => setIsOpen(true)} />
      {isOpen && <FeedbackChat onClose={() => setIsOpen(false)} />}
    </>
  );
}