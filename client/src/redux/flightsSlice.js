import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flights: null
}

const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setFlights: (state, action) => {
            state.flights = action.payload
        },
        resetFlightsState: (state) => {
            state.flights = null
        }
    }
});

export const {
    setFlights,
    resetFlightsState
} = flightsSlice.actions;

export default flightsSlice.reducer;