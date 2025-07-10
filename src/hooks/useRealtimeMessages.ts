import { useEffect } from 'react';
import { supabase } from '../lib/services/supabase-client-service';
import { type Message } from '../store/messagesApi';

/**
 * Subscribes to realtime message inserts for a given chat_id,
 * and calls onMessage with new message objects.
 */
export function useRealtimeMessages({
  chatId,
  onMessage,
}: {
  chatId: string;
  onMessage: (msg: Message) => void;
}) {
  useEffect(() => {
    if (!chatId) return;
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          if (payload.new) {
            onMessage(payload.new as Message);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, onMessage]);
}
