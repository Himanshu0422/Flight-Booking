
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import flightsReducer from './flightsSlice';

const rootReducer = combineReducers({
    flights: flightsReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;