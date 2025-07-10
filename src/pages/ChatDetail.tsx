import { useParams } from 'react-router-dom';
import { useGetChatsQuery } from '../store/chatsApi';
import { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useDeleteMessageMutation } from '../store/messagesApi';
import { type Message } from '../store/messagesApi';
import { useGetUserQuery } from '../store/userApi';
import { useState, useRef, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import toast from 'react-hot-toast';
import type { FormEvent } from 'react';

const ChatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: chats, isLoading, error } = useGetChatsQuery();
  const { data: user } = useGetUserQuery();
  const chat = chats?.find((c) => c.id === id);

  // Pagination state
  const [messages, setMessages] = useState<Message[]>([]);
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Message input
  const [newMessage, setNewMessage] = useState('');
  const [sendMessage, { isLoading: isSending }] = useCreateMessageMutation();

  // Message edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  // Modal state for delete confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Infinite scroll ref
  const topRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages
  const { data: fetchedMessages, isLoading: loadingMessages, refetch } = useGetMessagesQuery(
    { chat_id: id!, limit: 20, after },
    { skip: !id || !hasMore }
  );

  // Append fetched messages
  useEffect(() => {
    if (fetchedMessages && fetchedMessages.length > 0) {
      setMessages((prev) => [...prev, ...fetchedMessages]);
      setAfter(fetchedMessages[fetchedMessages.length - 1].created_at);
      if (fetchedMessages.length < 20) setHasMore(false);
    } else if (fetchedMessages && fetchedMessages.length === 0) {
      setHasMore(false);
    }
    setFetching(false);
  }, [fetchedMessages]);

  // Handle scroll to top for infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop < 50 && hasMore && !fetching && !loadingMessages) {
        setFetching(true);
        refetch();
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, fetching, loadingMessages, refetch]);

  // Send message
  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    const result = await sendMessage({ chat_id: id!, sender_id: user.id, content: newMessage.trim() });
    if ('data' in result && result.data) {
      setMessages([result.data, ...messages]);
      setNewMessage('');
    }
  };

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
    <>
      <Toast />
      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={async () => {
          if (pendingDeleteId) {
            try {
              await deleteMessage({ id: pendingDeleteId }).unwrap();
              setMessages(prev => prev.filter(m => m.id !== pendingDeleteId));
              toast.success('Message deleted');
            } catch (err) {
              toast.error('Failed to delete message');
            }
          }
          setDeleteModalOpen(false);
          setPendingDeleteId(null);
        }}
        onCancel={() => {
          setDeleteModalOpen(false);
          setPendingDeleteId(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-2">
        <div className="bg-white p-4 rounded shadow w-full max-w-lg flex flex-col h-[80vh]">
        <h2 className="text-2xl font-bold mb-2 text-center">{chat.name}</h2>
        <div className="text-center text-gray-700 mb-2">{chat.description}</div>
        <div className="text-center text-gray-400 text-xs mb-2">
          Created: {new Date(chat.created_at).toLocaleString()}
        </div>
        {/* Messages List */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 mb-2 px-1 border rounded bg-gray-50"
        >
          <div ref={topRef}></div>
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-4">No messages yet.</div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col items-${msg.sender_id === user?.id ? 'end' : 'start'} max-w-full group`}
            >
              <div className="flex items-center gap-2">
                {editingId === msg.id ? (
                  <>
                    <input
                      className="px-2 py-1 rounded border max-w-xs"
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      disabled={isUpdating}
                      autoFocus
                    />
                    <button
                      className="text-green-600 font-bold px-2"
                      onClick={async () => {
                        try {
                          await updateMessage({ id: msg.id, content: editContent }).unwrap();
                          setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, content: editContent } : m));
                          setEditingId(null);
                          toast.success('Message updated');
                        } catch (err) {
                          toast.error('Failed to update message');
                        }
                      }}
                      disabled={isUpdating || !editContent.trim()}
                    >
                      ✓
                    </button>
                    <button
                      className="text-gray-400 font-bold px-2"
                      onClick={() => setEditingId(null)}
                      disabled={isUpdating}
                    >
                      ✗
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className={`px-3 py-2 rounded-lg mb-1 break-words max-w-xs ${
                        msg.sender_id === user?.id
                          ? 'bg-blue-500 text-white self-end'
                          : 'bg-gray-200 text-gray-900 self-start'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.sender_id === user?.id && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="text-yellow-500 text-xs px-1"
                          onClick={() => {
                            setEditingId(msg.id);
                            setEditContent(msg.content);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 text-xs px-1"
                          onClick={() => {
                            setDeleteModalOpen(true);
                            setPendingDeleteId(msg.id);
                          }}
                          disabled={isDeleting}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {msg.sender_id === user?.id ? 'You' : msg.sender_id.slice(0, 8)} ·{' '}
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {loadingMessages && (
            <div className="text-center text-gray-400">Loading messages...</div>
          )}
        </div>
        {/* Message Input */}
        <form onSubmit={handleSend} className="flex gap-2 mt-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            disabled={isSending || !newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChatDetail;
