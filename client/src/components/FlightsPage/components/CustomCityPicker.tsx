import React, { useState } from "react";
import CustomSelectCity from "../../common/CustomSelectCity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setArrivalCity, setDepartureCity } from "../../../redux/searchSlice";
import { GoArrowSwitch } from "react-icons/go";

const cities = ["Chandigarh,India", "Delhi,India", "Bengaluru,India"];

const CustomCityPicker = () => {
  const dispatch = useDispatch();

  const { departureCity, arrivalCity } = useSelector((state: RootState) => state.search);

  const handleDepartureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setDepartureCity(event.target.value));
  };

  const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setArrivalCity(event.target.value));
  }

  return (
    <div className="flex h-[50px] w-max border rounded-lg gap-4 justify-center items-center px-4">
      <CustomSelectCity
        value={departureCity}
        onChange={handleDepartureChange}
        options={cities}
      />
      <div className="border rounded-full p-2">
        <GoArrowSwitch />
      </div>
      <CustomSelectCity
        value={arrivalCity}
        onChange={handleArrivalChange}
        options={cities}
      />
    </div>
  );
};

export default CustomCityPicker;
