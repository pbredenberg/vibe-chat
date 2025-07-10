import { useParams } from 'react-router-dom';
import { useGetChatsQuery } from '../store/chatsApi';

const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: chats, isLoading, error } = useGetChatsQuery();
  const chat = chats?.find((c) => c.id === id);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-500">
        Error loading chat.
      </div>
    );
  if (!chat)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        Chat not found.
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-center">{chat.name}</h2>
        <div className="text-center text-gray-700 mb-2">{chat.description}</div>
        <div className="text-center text-gray-400 text-xs">
          Created: {new Date(chat.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
