import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    returnFlight: null
}

const returnFlightSlice = createSlice({
    name: "returnflight",
    initialState,
    reducers: {
        setReturnFlight: (state, action) => {
            state.returnFlight = action.payload
        },
        resetReturnFlightState: (state) => {
            state.returnFlight = null
        }
    }
});

export const {
    setReturnFlight,
    resetReturnFlightState
} = returnFlightSlice.actions;

export default returnFlightSlice.reducer;