import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/services/supabase-client-service';

export interface Chat {
  id: string;
  creator_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const chatsApi = createApi({
  reducerPath: 'chatsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Chats'],
  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      async queryFn() {
        const { data, error } = await supabase
          .from('chats')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) return { error: { message: error.message } };
        return { data: data as Chat[] };
      },
      providesTags: ['Chats'],
    }),
    createChat: builder.mutation<
      Chat,
      { name: string; description?: string; creator_id: string }
    >({
      async queryFn({ name, description, creator_id }) {
        const { data, error } = await supabase
          .from('chats')
          .insert([{ name, description, creator_id }])
          .select()
          .single();
        if (error) return { error: { message: error.message } };
        return { data: data as Chat };
      },
      invalidatesTags: ['Chats'],
    }),
    updateChat: builder.mutation<
      Chat,
      { id: string; name: string; description?: string }
    >({
      async queryFn({ id, name, description }) {
        const { data, error } = await supabase
          .from('chats')
          .update({ name, description })
          .eq('id', id)
          .select()
          .single();
        if (error) return { error: { message: error.message } };
        return { data: data as Chat };
      },
      invalidatesTags: ['Chats'],
    }),
    deleteChat: builder.mutation<{ id: string }, { id: string }>({
      async queryFn({ id }) {
        const { error } = await supabase.from('chats').delete().eq('id', id);
        if (error) return { error: { message: error.message } };
        return { data: { id } };
      },
      invalidatesTags: ['Chats'],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatsApi;
