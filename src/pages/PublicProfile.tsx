import { useEffect, useState } from 'react';
import { UserProfile } from '../components/UserProfile';
import { supabase } from '../lib/services/supabase-client-service';
import type { Profile } from '../types/profile';



export interface PublicProfileProps {
  userId: string;
}

export const PublicProfile: React.FC<PublicProfileProps> = ({
  userId,
}: PublicProfileProps) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Pobierz profil użytkownika
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Pobierz liczbę wyświetleń
        const { data: viewsData, error: viewsError } = await supabase
          .rpc('get_profile_views', {
            _profile_id: userId
          });

        if (viewsError) {
          console.error('Błąd podczas pobierania liczby wyświetleń:', viewsError);
        } else if (viewsData) {
          setViews(viewsData.view_count);
        }
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div>
      <UserProfile userId={userId} />
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Number of views: {views}
        </p>
      </div>
    </div>
  );
};
