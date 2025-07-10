import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/services/supabase-client-service';

export interface User {
  id: string;
  email: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, { email: string; password: string }>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: { message: error.message } };
        if (!data.user) return { error: { message: 'No user returned' } };
        return { data: { id: data.user.id, email: data.user.email! } };
      },
    }),
    signIn: builder.mutation<User, { email: string; password: string }>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error: { message: error.message } };
        if (!data.user) return { error: { message: 'No user returned' } };
        return { data: { id: data.user.id, email: data.user.email! } };
      },
    }),
    signOut: builder.mutation<{ success: boolean }, void>({
      async queryFn() {
        const { error } = await supabase.auth.signOut();
        if (error) return { error: { message: error.message } };
        return { data: { success: true } };
      },
    }),
    getUser: builder.query<User | null, void>({
      async queryFn() {
        const { data, error } = await supabase.auth.getUser();
        if (error) return { error: { message: error.message } };
        if (!data.user) return { data: null };
        return { data: { id: data.user.id, email: data.user.email! } };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetUserQuery,
} = userApi;
