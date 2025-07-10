import { MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserQuery, useSignOutMutation, userApi } from '../store/userApi';
import { useAppDispatch } from '../store/hooks';

const Header = () => {
  const { data: user, refetch } = useGetUserQuery();
  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await signOut();
    dispatch(userApi.util.resetApiState());
    await refetch(); // Force refetch to update header state
    navigate('/login');
  };

  return (
    <nav className="w-full py-4 px-6 bg-white shadow flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold tracking-tight"
      >
        <MessageCircle className="w-6 h-6 text-blue-500" />
        Vibe Chat
      </Link>
      <div className="flex gap-4 text-base items-center">
        {user ? (
          <>
            <Link to="/chats" className="hover:underline">
              Chats
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline border-none p-0 cursor-pointer"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Log Out'}
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
