import {configureStore} from '@reduxjs/toolkit';

import {RootApi} from './api/rootApi';
import {RootReducer} from './api/rootReducer';

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat(RootApi.middleware),
});
