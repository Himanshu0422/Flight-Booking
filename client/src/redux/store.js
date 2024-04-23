
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import departureFlightReducer from './departureFlightSlice';
import returnFlightReducer from './returnFlightSlice';
import searchReducer from './searchSlice';

const rootReducer = combineReducers({
    departureflight: departureFlightReducer,
    returnflight: returnFlightReducer,
    search: searchReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;