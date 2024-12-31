import React, { useState } from 'react';
import { Send, MapPin, Calendar } from 'lucide-react';
import { ChatRoom as ChatRoomType, Message } from '../types/chat';
import { Toy } from '../types/toy';

interface ChatRoomProps {
  chatRoom: ChatRoomType;
  toy: Toy;
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onProposeMeetup: (location: string, date: string, time: string) => void;
}

export function ChatRoom({
  chatRoom,
  toy,
  currentUserId,
  onSendMessage,
  onProposeMeetup,
}: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [showMeetupForm, setShowMeetupForm] = useState(false);
  const [meetupDetails, setMeetupDetails] = useState({
    location: '',
    date: '',
    time: '',
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <img
            src={toy.images[0].url}
            alt={toy.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold">{toy.name}</h3>
            <p className="text-sm text-gray-500">{toy.owner.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatRoom.messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === currentUserId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {showMeetupForm ? (
        <div className="border-t p-4 bg-white">
          <h4 className="font-semibold mb-2">Propose Meetup</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Location"
              value={meetupDetails.location}
              onChange={(e) =>
                setMeetupDetails({ ...meetupDetails, location: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={meetupDetails.date}
                onChange={(e) =>
                  setMeetupDetails({ ...meetupDetails, date: e.target.value })
                }
                className="flex-1 p-2 border rounded"
              />
              <input
                type="time"
                value={meetupDetails.time}
                onChange={(e) =>
                  setMeetupDetails({ ...meetupDetails, time: e.target.value })
                }
                className="flex-1 p-2 border rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onProposeMeetup(
                    meetupDetails.location,
                    meetupDetails.date,
                    meetupDetails.time
                  );
                  setShowMeetupForm(false);
                }}
                className="flex-1 bg-blue-500 text-white p-2 rounded"
              >
                Propose
              </button>
              <button
                onClick={() => setShowMeetupForm(false)}
                className="flex-1 bg-gray-200 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => {
                if (message.trim()) {
                  onSendMessage(message);
                  setMessage('');
                }
              }}
              className="p-2 bg-blue-500 text-white rounded"
            >
              <Send size={20} />
            </button>
            <button
              onClick={() => setShowMeetupForm(true)}
              className="p-2 bg-green-500 text-white rounded"
            >
              <Calendar size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}