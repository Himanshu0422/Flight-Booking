import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureDate,
  setPassenger,
  setReturnDate,
} from "../../redux/searchSlice";
import { AppDispatch, RootState } from "../../redux/store";
import DepartureDate from "../common/DepartureDate";
import ReturnDate from "../common/ReturnDate";
import CustomCityPicker from "./components/CustomCityPicker";
import { Dayjs } from "dayjs";
import Passenger from "../common/Passenger";

const Search = () => {
  const { departureDate, returnDate, passenger } = useSelector(
    (state: RootState) => state.search
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-[100%] flex flex-wrap justify-center items-center gap-8 search-flight bg-gray-500">
      <CustomCityPicker />
      <DepartureDate
        departureDate={departureDate}
        setDepartureDate={(value: Dayjs) => dispatch(setDepartureDate(value))}
      />
      <ReturnDate
        returnDate={returnDate}
        setReturnDate={(value) => dispatch(setReturnDate(value))}
      />
      <Passenger
        passenger={passenger}
        setPassenger={(value: number) => dispatch(setPassenger(value))}
      />
    </div>
  );
};

export default Search;
