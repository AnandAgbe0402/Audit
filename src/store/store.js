import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
