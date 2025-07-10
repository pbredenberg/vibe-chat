import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="w-full py-4 px-6 bg-white shadow flex items-center justify-between">
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-bold tracking-tight"
    >
      <MessageCircle className="w-6 h-6 text-blue-500" />
      Vibe Chat
    </Link>
    <div className="flex gap-4 text-base">
      <Link to="/signup" className="hover:underline">
        Sign Up
      </Link>
      <Link to="/login" className="hover:underline">
        Log In
      </Link>
      <Link to="/profile" className="hover:underline">
        Profile
      </Link>
    </div>
  </nav>
);

export default Header;
