import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setDepartureFlight } from "../../../redux/departureFlightSlice";
import { setReturnFlight } from "../../../redux/returnFlightSlice";
import {
    setArrivalCity,
    setDepartureCity,
    setDepartureDate,
    setFlightClass,
    setPassenger,
    setReturnDate,
} from "../../../redux/searchSlice";
import { getCurrentTime, getDate } from "../../../utils/Date";
import CitySelect from "./CitySelect";
import DepartureDate from "./DepartureDate";
import Passenger from "./Passenger";
import ReturnDate from "./ReturnDate";

const SearchFlight = () => {
    const [searchParams, setSearchParams] = useState({
        departureCity: "",
        arrivalCity: "",
        departureDate: getDate(),
        returnDate: "",
        passenger: 1,
        flightClass: "Economy",
    });

    const dispatch = useDispatch();
    const URL = process.env.REACT_APP_BACKEND_API;

    const handleInputChange = (name, value) => {
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearchFlight = async (e) => {
        e.preventDefault();
        try {
            const {
                departureCity,
                arrivalCity,
                departureDate,
                returnDate,
                passenger,
                flightClass,
            } = searchParams;

            if (!departureCity || !arrivalCity) {
                return toast.error("Select the cities to search for flights");
            }

            if (departureCity === arrivalCity) {
                return toast.error(`Departure and Arrival City can't be the same`);
            }

            if (returnDate && departureDate > returnDate) {
                return toast.error(
                    `Return date should be equal to or greater than departure date`
                );
            }

            dispatch(setDepartureCity(departureCity));
            dispatch(setArrivalCity(arrivalCity));
            dispatch(setDepartureDate(departureDate));
            dispatch(setReturnDate(returnDate));
            dispatch(setPassenger(passenger));
            dispatch(setFlightClass(flightClass));

            const response1 = await axios.get(`${URL}/airport`, {
                params: { city: departureCity },
            });
            const response2 = await axios.get(`${URL}/airport`, {
                params: { city: arrivalCity },
            });

            const departureAirportId = response1.data.data.id;
            const arrivalAirportId = response2.data.data.id;
            let time = getCurrentTime();

            time = getDate(departureDate) !== getDate() ? "23:00" : time;

            const [response, returnResponse] = await Promise.all([
                axios.get(`${URL}/flights`, {
                    params: {
                        departureAirportId,
                        arrivalAirportId,
                        time,
                    },
                }),
                returnDate &&
                axios.get(`${URL}/flights`, {
                    params: {
                        arrivalAirportId: departureAirportId,
                        departureAirportId: arrivalAirportId,
                        time,
                    },
                }),
            ]);

            dispatch(setDepartureFlight(response?.data?.data));
            if(returnResponse){
                dispatch(setReturnFlight(returnResponse?.data?.data))
            }
            console.log(response?.data?.data, returnResponse?.data?.data);
        } catch (error) {
            toast.error("An error occurred while searching for flights");
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-4 space-y-5 w-[96%] max-lg:w-[50%] max-md:w-[60%] max-sm:w-[80%] rounded-2xl search-flight-main">
            <div className="ml-2">
                <i className="fa-solid fa-plane"></i> Search Flights
            </div>
            <div className="flex justify-around gap-3 search-flight">
                <CitySelect
                    departureCity={searchParams.departureCity}
                    setDepartureCity={(value) =>
                        handleInputChange("departureCity", value)
                    }
                    arrivalCity={searchParams.arrivalCity}
                    setArrivalCity={(value) => handleInputChange("arrivalCity", value)}
                />
                <DepartureDate
                    departureDate={searchParams.departureDate}
                    setDepartureDate={(value) =>
                        handleInputChange("departureDate", value)
                    }
                />
                <ReturnDate
                    returnDate={searchParams.returnDate}
                    setReturnDate={(value) => handleInputChange("returnDate", value)}
                />
                <Passenger
                    passenger={searchParams.passenger}
                    setPassenger={(value) => handleInputChange("passenger", value)}
                    flightClass={searchParams.flightClass}
                    setFlightClass={(value) => handleInputChange("flightClass", value)}
                />
                <div>
                    <button
                        onClick={handleSearchFlight}
                        className="w-full h-full cursor-pointer flex justify-center items-center gap-1 border p-3 bg-orange-400 rounded-lg"
                    >
                        Search Flights <CiSearch size="40px" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFlight;
