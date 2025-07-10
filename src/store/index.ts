import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { chatsApi } from './chatsApi';
import { messagesApi } from './messagesApi';
import { profilesApi } from './profilesApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      chatsApi.middleware,
      messagesApi.middleware,
      profilesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
