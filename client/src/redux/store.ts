import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flightReducer from './flights/flightSlice';
import searchReducer from './searchSlice';
import loadingReducer from './loadingSlice';

// Define the root reducer and its type
const rootReducer = combineReducers({
  flight: flightReducer,
  search: searchReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the store and its type
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
