import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departureCity: null,
    arrivalCity: null,
    departureDate: null,
    returnDate: null,
    passenger: null,
    flightClass: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setDepartureCity: (state, action) => {
            state.departureCity = action.payload;
        },
        setArrivalCity: (state, action) => {
            state.arrivalCity = action.payload;
        },
        setDepartureDate: (state, action) => {
            state.departureDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.returnDate = action.payload;
        },
        setPassenger: (state, action) => {
            state.passenger = action.payload;
        },
        setFlightClass: (state, action) => {
            state.flightClass = action.payload;
        },
    },
});

export const {
    setDepartureCity,
    setArrivalCity,
    setDepartureDate,
    setReturnDate,
    setPassenger,
    setFlightClass,
} = searchSlice.actions;

export default searchSlice.reducer;
