import React, { useState } from 'react';
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GoArrowSwitch } from "react-icons/go";
import CustomSelectCity from './CustomSelectCity';

const cities = [
    "New York, USA",
    "Los Angeles, USA",
    "Chicago, USA",
    "Houston, USA",
    "Phoenix, USA",
    "Philadelphia, USA",
    "San Antonio, USA",
    "San Diego, USA",
    "Dallas, USA",
    "San Jose, USA"
];

const SearchFlight = () => {
    const [departureCity, setDepartureCity] = useState('Select City');
    const [arrivalCity, setArrivalCity] = useState('Select City');

    const handleDepartureChange = (event) => {
        setDepartureCity(event.target.value);
    };

    const handleArrivalChange = (event) => {
        setArrivalCity(event.target.value);
    };

    return (
        <div className='bg-white p-4 space-y-5 w-max'>
            <div className='flex space-x-5'>
                <button><i className="fa-solid fa-plane"></i> Flights</button>
                <div>|</div>
                <button><i className="fa-solid fa-hotel"></i> Hotels</button>
            </div>
            <div className='flex'>
                <div className='flex max-sm:flex-col justify-center items-center gap-5 border p-3 rounded-md'>
                    <div className='flex gap-3 items-center flex-1'>
                        <div className='bg-orange-400 text-white rounded-full text-xl p-2 flex justify-center items-center'>
                            <GiAirplaneDeparture />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className='text-sm'>Departure City</div>
                            <CustomSelectCity
                                value={departureCity}
                                onChange={handleDepartureChange}
                                options={cities}
                            />
                        </div>
                    </div>
                    <div className='border rounded-full p-2'>
                        <GoArrowSwitch />
                    </div>
                    <div className='flex gap-3 items-center flex-1'>
                        <div className='bg-orange-400 text-white rounded-full text-xl p-2 flex justify-center items-center'>
                            <GiAirplaneArrival />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className='text-sm'>Arrival City</div>
                            <CustomSelectCity
                                value={arrivalCity}
                                onChange={handleArrivalChange}
                                options={cities}
                            />
                        </div>
                    </div>
                </div>
                <div className='border p-3 rounded-md flex justify-center items-center'>
                    <div className='border rounded-full p-3 flex justify-center'>
                        <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div>
                        <div className='text-sm'>Departure - Arrival</div>
                        <div className='flex'>
                            <input
                                type='date'
                            />
                            <div>-</div>
                            <input
                                type='date'
                                value='One Way'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFlight;
