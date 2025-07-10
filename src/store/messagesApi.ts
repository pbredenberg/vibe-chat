import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/services/supabase-client-service';

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], { chat_id: string; limit?: number; after?: string }>({
      async queryFn({ chat_id, limit = 20, after }) {
        let query = supabase
          .from('messages')
          .select('*')
          .eq('chat_id', chat_id)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (after) {
          query = query.lt('created_at', after);
        }

        const { data, error } = await query;
        if (error) return { error: { message: error.message } };
        return { data: data as Message[] };
      },
      providesTags: ['Messages'],
    }),
    createMessage: builder.mutation<Message, { chat_id: string; sender_id: string; content: string }>({
      async queryFn({ chat_id, sender_id, content }) {
        const { data, error } = await supabase
          .from('messages')
          .insert([{ chat_id, sender_id, content }])
          .select()
          .single();
        if (error) return { error: { message: error.message } };
        return { data: data as Message };
      },
      invalidatesTags: ['Messages'],
    }),
    updateMessage: builder.mutation<Message, { id: string; content: string }>({
      async queryFn({ id, content }) {
        const { data, error } = await supabase
          .from('messages')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) return { error: { message: error.message } };
        return { data: data as Message };
      },
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<{ id: string }, { id: string }>({
      async queryFn({ id }) {
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) return { error: { message: error.message } };
        return { data: { id } };
      },
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation, useUpdateMessageMutation, useDeleteMessageMutation } = messagesApi;
