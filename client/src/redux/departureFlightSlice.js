import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departureFlight: null
}

const departureFlightSlice = createSlice({
    name: "departureflight",
    initialState,
    reducers: {
        setDepartureFlight: (state, action) => {
            state.departureFlight = action.payload
        },
        resetDepartureFlightState: (state) => {
            state.departureFlight = null
        }
    }
});

export const {
    setDepartureFlight,
    resetDepartureFlightState
} = departureFlightSlice.actions;

export default departureFlightSlice.reducer;