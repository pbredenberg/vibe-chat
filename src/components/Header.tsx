import { MessageCircle } from 'lucide-react';

const Header = () => (
  <nav className="w-full py-4 px-6 bg-white shadow flex items-center justify-between">
    <span className="flex items-center gap-2 text-xl font-bold tracking-tight">
      <MessageCircle className="w-6 h-6 text-blue-500" />
      Vibe Chat
    </span>
    {/* Add nav links or user actions here if needed */}
  </nav>
);

export default Header;
