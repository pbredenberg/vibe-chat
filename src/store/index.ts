import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { chatsApi } from './chatsApi';
import { messagesApi } from './messagesApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, chatsApi.middleware, messagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
