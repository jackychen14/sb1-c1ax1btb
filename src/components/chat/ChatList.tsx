import React from 'react';
import { MessageCircle } from 'lucide-react';

export function ChatList() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <div className="text-center text-gray-500 py-8">
        <MessageCircle className="mx-auto mb-2" size={32} />
        <p>No messages yet</p>
        <p className="text-sm">Start matching with toys to chat!</p>
      </div>
    </div>
  );
}