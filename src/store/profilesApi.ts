import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../lib/services/supabase-client-service';
import type { Database } from '../types/database/supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const profilesApi = createApi({
  reducerPath: 'profilesApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProfiles: builder.query<Profile[], { ids: string[] }>({
      async queryFn({ ids }) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .in('id', ids);
        if (error) return { error: { message: error.message } };
        return { data: data as Profile[] };
      },
    }),
  }),
});

export const { useGetProfilesQuery } = profilesApi;
