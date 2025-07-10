import { useGetUserQuery, useSignOutMutation } from '../store/userApi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { data: user, isLoading, error } = useGetUserQuery();
  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-500">
        Error loading profile.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        Not logged in.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Profile</h2>
        <div className="text-center text-gray-700">
          <span className="block font-semibold">Email:</span>
          <span className="block">{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded font-semibold mt-4"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
