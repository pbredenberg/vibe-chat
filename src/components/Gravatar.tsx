import React from 'react';
import { Gravatar } from 'react-gravatar';

interface GravatarProps {
  email: string;
  size?: number;
  className?: string;
}

export const GravatarComponent: React.FC<GravatarProps> = ({
  email,
  size = 40,
  className = ''
}) => {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      <Gravatar email={email} size={size} />
    </div>
  );
};
