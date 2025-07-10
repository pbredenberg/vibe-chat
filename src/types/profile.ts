export interface Profile {
  id: string;
  display_name: string;
  gravatar_email: string;
  bio: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileView {
  id: string;
  profile_id: string;
  viewer_id: string | null;
  created_at: string;
}
