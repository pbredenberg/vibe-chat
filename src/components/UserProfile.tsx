import React, { useState, useEffect } from 'react';

import type { Profile } from '../types/profile';
import { supabase } from '../lib/services/supabase-client-service';

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
}: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        setProfile(data);
      } catch (error: unknown) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={`https://www.gravatar.com/avatar/${profile.gravatar_email || profile.id}?d=identicon`}
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.display_name}</h1>
          <p className="text-gray-600">
            Last updated: {new Date(profile.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {profile.bio && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About me</h2>
          <p className="text-gray-700">{profile.bio}</p>
        </div>
      )}

      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send message
        </button>
      </div>
    </div>
  );
};
