import React from 'react';
import { GravatarComponent } from './Gravatar';
import type { Message as MessageType } from '../types/chat';

interface MessageProps {
  message: MessageType;
  isOwnMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isOwnMessage }: MessageProps) => {
  const messageClass = isOwnMessage
    ? 'bg-blue-500 text-white'
    : 'bg-gray-100 text-gray-900';
  const alignClass = isOwnMessage ? 'flex-row-reverse' : 'flex-row';
  const avatarClass = isOwnMessage ? 'order-2' : 'order-1';
  const contentClass = isOwnMessage ? 'order-1' : 'order-2';

  return (
    <div className={`flex ${alignClass} space-x-4 p-4`}>
      <div className={`flex-shrink-0 ${avatarClass}`}>
        <GravatarComponent
          email={message.profile?.gravatar_email || message.sender_id}
          size={32}
        />
      </div>
      <div className={`flex-1 ${contentClass}`}>
        <div className={`max-w-md rounded-lg shadow ${messageClass} p-3`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">
              {message.profile?.display_name || 'Nieznany użytkownik'}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};
