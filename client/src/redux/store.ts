import { configureStore, combineReducers } from '@reduxjs/toolkit';
import departureFlightReducer from './departureFlightSlice';
import returnFlightReducer from './returnFlightSlice';
import searchReducer from './searchSlice';

// Define the root reducer and its type
const rootReducer = combineReducers({
  departureflight: departureFlightReducer,
  returnflight: returnFlightReducer,
  search: searchReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the store and its type
const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

export default store;
