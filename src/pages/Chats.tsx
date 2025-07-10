import { useState } from 'react';
import { useGetUserQuery } from '../store/userApi';
import {
  useGetChatsQuery,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} from '../store/chatsApi';
import type { Chat } from '../store/chatsApi';
import { useNavigate } from 'react-router-dom';

const Chats = () => {
  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const navigate = useNavigate();
  const { data: chats, isLoading, error } = useGetChatsQuery();
  const [createChat] = useCreateChatMutation();
  const [updateChat] = useUpdateChatMutation();
  const [deleteChat] = useDeleteChatMutation();
  const [newChat, setNewChat] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: '', description: '' });

  if (userLoading) return <div>Loading...</div>;
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChat.name) return;
    await createChat({
      name: newChat.name,
      description: newChat.description,
      creator_id: user.id,
    });
    setNewChat({ name: '', description: '' });
  };

  const handleEdit = (chat: Chat) => {
    setEditingId(chat.id);
    setEditValues({ name: chat.name, description: chat.description || '' });
  };

  const handleUpdate = async (id: string) => {
    await updateChat({
      id,
      name: editValues.name,
      description: editValues.description,
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteChat({ id });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 w-full">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Chats</h2>
        <form
          onSubmit={handleCreate}
          className="w-full flex flex-col gap-2 mb-4"
        >
          <input
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Chat name"
            value={newChat.name}
            onChange={(e) => setNewChat({ ...newChat, name: e.target.value })}
            required
          />
          <input
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Description"
            value={newChat.description}
            onChange={(e) =>
              setNewChat({ ...newChat, description: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Create
          </button>
        </form>
        {isLoading ? (
          <div>Loading chats...</div>
        ) : error ? (
          <div className="text-red-500">Error loading chats.</div>
        ) : (
          <ul className="space-y-2">
            {chats && chats.length === 0 && (
              <li className="text-gray-500">No chats yet.</li>
            )}
            {chats &&
              chats.map((chat) => (
                <li
                  key={chat.id}
                  className="border rounded p-3 flex flex-col gap-2"
                >
                  {editingId === chat.id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="border px-2 py-1 rounded"
                        value={editValues.description}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            description: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          onClick={() => handleUpdate(chat.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 px-3 py-1 rounded"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          {chat.name}
                        </span>
                        {chat.creator_id === user.id && (
                          <div className="flex gap-2">
                            <button
                              className="bg-yellow-400 text-white px-2 py-1 rounded"
                              onClick={() => handleEdit(chat)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDelete(chat.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {chat.description}
                      </span>
                      <span className="text-gray-400 text-xs">
                        Created: {new Date(chat.created_at).toLocaleString()}
                      </span>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Chats;
