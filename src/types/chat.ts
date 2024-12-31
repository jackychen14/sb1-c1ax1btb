export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  toyId: string;
  participants: string[];
  messages: Message[];
  meetupProposal?: MeetupProposal;
}

export interface MeetupProposal {
  location: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
  proposedBy: string;
}