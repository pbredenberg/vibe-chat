import React, { useState } from 'react';
import type { Profile } from '../types/profile';
import { supabase } from '../lib/services/supabase-client-service';

interface ProfileEditProps {
  profile: Profile;
  onClose: () => void;
  onProfileUpdate?: (updatedProfile: Profile) => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({
  profile,
  onClose,
  onProfileUpdate,
}) => {
  const [formData, setFormData] = useState({
    display_name: profile.display_name || '',
    gravatar_email: profile.gravatar_email ?? '',
    bio: profile.bio ?? '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          gravatar_email: formData.gravatar_email,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)
        .select();

      if (error) throw error;

      // Zaktualizuj dane profilu w komponencie nadrzędnym
      if (onProfileUpdate) {
        onProfileUpdate({
          ...profile,
          display_name: formData.display_name,
          gravatar_email: formData.gravatar_email,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        });
      }

      onClose();
    } catch (error) {
      console.error('Błąd aktualizacji profilu:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Zapisywanie...</div>;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edycja profilu
          </h3>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nazwa wyświetlana
                </label>
                <input
                  type="text"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email dla avataru
                </label>
                <input
                  type="email"
                  name="gravatar_email"
                  value={formData.gravatar_email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Opis
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Zapisywanie...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
