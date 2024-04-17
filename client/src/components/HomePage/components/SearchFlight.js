import React, { useState } from "react";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { GoArrowSwitch } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import getTodayDate from "../../../utils/Date";
import BasicDatePicker from "../../../utils/DatePicker";
import CustomSelectCity from "./CustomSelectCity";
import PassengerClass from "./PassengerClass";

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
    "San Jose, USA",
];

const SearchFlight = () => {
    const [departureCity, setDepartureCity] = useState("Select City");
    const [arrivalCity, setArrivalCity] = useState("Select City");
    const [departureDate, setDepartureDate] = useState(getTodayDate());
    const [arrivalDate, setArrivalDate] = useState(getTodayDate());
    const [passenger, setPassenger] = useState(1);
    const [flightClass, setFlightClass] = useState("Economy");
    const [popup, setPopup] = useState(false);
    const [oneway, setOneway] = useState(true);
    const minDate = getTodayDate();

    const handleDepartureChange = (event) => {
        setDepartureCity(event.target.value);
    };

    const handleArrivalChange = (event) => {
        setArrivalCity(event.target.value);
    };

    const handleDepartureDateChange = (date) => {
        setDepartureDate(date);
    };

    const handleArrivalDateChange = (date) => {
        setArrivalDate(date);
    };

    return (
        <div className="bg-white p-4 space-y-5 w-[96%] max-lg:w-[50%] max-md:w-[60%] max-sm:w-[80%] rounded-2xl search-flight-main">
            <div className="ml-2">
                <i className="fa-solid fa-plane"></i> Search Flights
            </div>
            <div className="flex justify-around search-flight">
                <div className="flex max-sm:flex-col justify-center items-center gap-5 border p-3 rounded-lg">
                    <div className="flex gap-3 items-center flex-1">
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
                    <div className="flex gap-3 items-center flex-1">
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
                <div className="border p-3 rounded-lg flex gap-2 justify-center items-center">
                    <div className="border rounded-full p-3 flex justify-center">
                        <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs">Departure</div>
                        <BasicDatePicker
                            minDate={minDate}
                            value={departureDate}
                            onChange={handleDepartureDateChange}
                            type='departure'
                        />
                    </div>
                </div>
                <div className="">
                    {oneway ? (
                        <div
                            className="border p-3 rounded-lg flex gap-2 cursor-pointer justify-center items-center h-full"
                            onClick={() => setOneway(false)}
                        >
                            <div className="border rounded-full p-3 flex justify-center">
                                <i className="fa-solid fa-calendar-days"></i>
                            </div>
                            <div>
                                <div>Return</div>
                                <div className="text-xs">Tap to add a return date</div>
                            </div>
                        </div>
                    ) : (
                        <div className="border p-3 rounded-lg flex gap-2 justify-center items-center">
                            <div className="border rounded-full p-3 flex justify-center">
                                <i className="fa fa-calendar-days"></i>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <div className="text-xs">Arrival</div>
                                    <div
                                        className="text-xs cursor-pointer"
                                        onClick={() => setOneway(true)}
                                    >
                                        One Way
                                    </div>
                                </div>
                                <BasicDatePicker
                                    minDate={minDate}
                                    value={arrivalDate}
                                    onChange={handleArrivalDateChange}
                                    type='arrival'
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative flex justify-center cursor-pointer items-center gap-4 border p-3 rounded-lg">
                    <div className="border rounded-full p-3 flex justify-center">
                        <IoPersonOutline />
                    </div>
                    <div onClick={() => setPopup(true)}>
                        <div className="flex text-xs gap-1">
                            <div>Passenger</div>
                            <div>-</div>
                            <div>Class</div>
                        </div>
                        <div className="flex gap-1 text-sm">
                            <div>{passenger} Passenger</div>
                            <div>-</div>
                            <div>{flightClass}</div>
                        </div>
                    </div>
                    {popup && (
                        <PassengerClass
                            setPassenger={setPassenger}
                            setFlightClass={setFlightClass}
                            setPopup={setPopup}
                            passenger={passenger}
                            flightClass={flightClass}
                        />
                    )}
                </div>
                <div className="">
                    <button className="h-full flex justify-center items-center gap-1 border p-3 bg-orange-400 rounded-lg">
                        Search Flights <CiSearch size='40px' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFlight;
