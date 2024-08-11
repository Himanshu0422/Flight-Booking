import React from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GoArrowSwitch } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomSelectCity from "./CustomSelectCity";

interface CitySelectProps {
  departureCity: string | null;
  setDepartureCity: (city: string) => void;
  arrivalCity: string | null;
  setArrivalCity: (city: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
}) => {
  const handleDepartureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartureCity(event.target.value);
  };

  const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArrivalCity(event.target.value);
  };

  const {airports} = useSelector((state:RootState) => state.airport)

  return (
    <div className="flex flex-1 h-full max-sm:flex-col justify-around items-center gap-5 border p-3 rounded-xl">
      <div className="flex gap-3 items-center">
        <div className="bg-orange-400 text-white rounded-full text-xl p-2 flex justify-center items-center">
          <GiAirplaneDeparture />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xs">Departure City</div>
          <CustomSelectCity
            value={departureCity}
            onChange={handleDepartureChange}
            options={airports}
          />
        </div>
      </div>
      <div className="border rounded-full p-2">
        <GoArrowSwitch />
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-orange-400 text-white rounded-full text-xl p-2 flex justify-center items-center">
          <GiAirplaneArrival />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xs">Arrival City</div>
          <CustomSelectCity
            value={arrivalCity}
            onChange={handleArrivalChange}
            options={airports}
          />
        </div>
      </div>
    </div>
  );
};

export default CitySelect;
