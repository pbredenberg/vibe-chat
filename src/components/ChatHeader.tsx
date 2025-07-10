import React from 'react';
import { GravatarComponent } from './Gravatar';
import type { ChatHeaderProps } from '../types/chat';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ userId, profile, onProfileClick }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
      <div className="flex items-center space-x-3">
        <GravatarComponent email={profile.gravatar_email || userId} size={40} />
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {profile.display_name}
          </h2>
          <p className="text-sm text-gray-500">Czat</p>
        </div>
      </div>
      <button
        onClick={onProfileClick}
        className="text-gray-500 hover:text-gray-700"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>
  );
};
