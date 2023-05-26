import {combineReducers} from '@reduxjs/toolkit';

import {RootApi} from './rootApi';

export const RootReducer = combineReducers({
  [RootApi.reducerPath]: RootApi.reducer,
});
