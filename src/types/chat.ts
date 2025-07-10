import type { Profile } from './profile';

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  profile?: Profile;
}

export interface ChatHeaderProps {
  userId: string;
  profile: Profile;
  onProfileClick: () => void;
}
