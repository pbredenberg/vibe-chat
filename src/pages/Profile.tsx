import { useState, useEffect } from 'react';
import { useGetUserQuery, useSignOutMutation } from '../store/userApi';
import { useNavigate } from 'react-router-dom';
import { ProfileEdit } from '../components/ProfileEdit';
import { supabase } from '../lib/services/supabase-client-service';
import type { Profile } from '../types/profile';

type ProfilePageProps = {
  userId: string;
};

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  const { data: user, isLoading, error } = useGetUserQuery();
  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-500">
        <div className="text-3xl">Error loading profile</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-3xl">You are not logged in</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-3xl">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        {editing ? (
          <ProfileEdit 
            profile={profile} 
            onClose={() => setEditing(false)} 
            onProfileUpdate={handleProfileUpdate}
          />
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={`https://www.gravatar.com/avatar/${profile.gravatar_email}?d=identicon`}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.display_name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {profile.bio || 'No description'}
                </p>
                <div className="mt-2">
                  <a 
                    href={`/profile/${userId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    My profile link
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edytuj profil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={isLoggingOut}
              >
                Wyloguj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
