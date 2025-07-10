import { Link } from 'react-router-dom';
import { useGetChatsQuery } from '../store/chatsApi';
import { useGetUserQuery } from '../store/userApi';
import { Eye, MessageCircle } from 'lucide-react';

const Home = () => {
  const { data: chats, isLoading, error } = useGetChatsQuery();
  const { data: user } = useGetUserQuery();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold text-center mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        Vibe Chat
      </h1>
      <h2 className="text-xl font-semibold mb-2">Public Chats</h2>
      {isLoading ? (
        <div>Loading chats...</div>
      ) : error ? (
        <div className="text-red-500">Error loading chats.</div>
      ) : (
        <ul className="w-full max-w-lg space-y-2 text-center">
          {chats && chats.length === 0 && (
            <li className="text-gray-500">No chats yet.</li>
          )}
          {chats &&
            chats.map((chat) => (
              <li
                key={chat.id}
                className="border rounded p-3 flex flex-col gap-1"
              >
                <Link
                  to={`/chats/${chat.id}`}
                  className="font-semibold text-lg underline flex flex-row items-center gap-2"
                >
                  {chat.name} <Eye className="w-4 h-4" />
                </Link>
                <span className="text-gray-600 text-sm">
                  {chat.description}
                </span>
                <span className="text-gray-400 text-xs">
                  Created: {new Date(chat.created_at).toLocaleString()}
                </span>
              </li>
            ))}
        </ul>
      )}
      {user && (
        <Link
          to="/chats"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded font-semibold"
        >
          Go to My Chats
        </Link>
      )}
    </div>
  );
};

export default Home;
