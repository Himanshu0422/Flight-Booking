import axios from 'axios';
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import getTodayDate from "../../../utils/Date";
import ArrivalDate from "./ArrivalDate";
import CitySelect from "./CitySelect";
import DepartureDate from "./DepartureDate";
import Passenger from "./Passenger";
import { setFlights } from '../../../redux/flightsSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchFlight = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureDate, setDepartureDate] = useState(getTodayDate());
    const [arrivalDate, setArrivalDate] = useState(getTodayDate());
    const [passenger, setPassenger] = useState(1);
    const [flightClass, setFlightClass] = useState("Economy");
    const dispatch = useDispatch();
    const { flights } = useSelector((state) => state.flights);
    const URL = process.env.REACT_APP_BACKEND_API;

    const handleSearchFlight = async (e) => {
        e.preventDefault();
        try {

            if(!departureCity || !arrivalCity){
                toast.error('Select the cities to search for flights');
                return;
            }
            
            if(departureCity === arrivalCity){
                toast.error(`Departure and Arrival City can't be same`);
                return;
            }

            const response1 = await axios.get(`${URL}/airport`, {
                params: {
                    city: departureCity
                }
            });
            const response2 = await axios.get(`${URL}/airport`, {
                params: { city: arrivalCity }
            });

            const departureAirportId = response1.data.data.id;
            const arrivalAirportId = response2.data.data.id;


            const response = await axios.get(`${URL}/flights`, {
                params: {
                    departureAirportId,
                    arrivalAirportId
                }
            });
            dispatch(setFlights(response.data.data))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white p-4 space-y-5 w-[96%] max-lg:w-[50%] max-md:w-[60%] max-sm:w-[80%] rounded-2xl search-flight-main">
            <div className="ml-2">
                <i className="fa-solid fa-plane"></i> Search Flights
            </div>
            <div className="flex justify-around gap-3 search-flight">
                <CitySelect
                    departureCity={departureCity}
                    setDepartureCity={setDepartureCity}
                    arrivalCity={arrivalCity}
                    setArrivalCity={setArrivalCity}
                />
                <DepartureDate
                    departureDate={departureDate}
                    setDepartureDate={setDepartureDate}
                />
                <ArrivalDate
                    arrivalDate={arrivalDate}
                    setArrivalDate={setArrivalDate}
                />
                <Passenger
                    passenger={passenger}
                    setPassenger={setPassenger}
                    flightClass={flightClass}
                    setFlightClass={setFlightClass}
                />
                <div className="cursor-pointer" onClick={handleSearchFlight}>
                    <button className="h-full flex justify-center items-center gap-1 border p-3 bg-orange-400 rounded-lg">
                        Search Flights <CiSearch size='40px' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFlight;
