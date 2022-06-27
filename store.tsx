import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {moviesApi} from './src/services/moviesApi';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});
