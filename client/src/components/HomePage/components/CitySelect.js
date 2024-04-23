import React from 'react';
import { GiAirplaneArrival, GiAirplaneDeparture } from 'react-icons/gi';
import { GoArrowSwitch } from 'react-icons/go';
import CustomSelectCity from './CustomSelectCity';

const cities = [
    "Chandigarh,India",
    "Delhi,India",
    "Bengaluru,India"
];

const CitySelect = ({departureCity, setDepartureCity, arrivalCity, setArrivalCity}) => {

    const handleDepartureChange = (event) => {
        setDepartureCity(event.target.value);
    };

    const handleArrivalChange = (event) => {
        setArrivalCity(event.target.value);
    };

    return (
        <div className="flex flex-1 max-sm:flex-col justify-around items-center gap-5 border p-3 rounded-lg">
            <div className="flex gap-3 items-center">
                <div className="bg-orange-400 text-white rounded-full text-xl p-2 flex justify-center items-center">
                    <GiAirplaneDeparture />
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-xs">Departure City</div>
                    <CustomSelectCity
                        value={departureCity}
                        onChange={handleDepartureChange}
                        options={cities}
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
                        options={cities}
                    />
                </div>
            </div>
        </div>
    )
}

export default CitySelect