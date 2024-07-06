import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Assuming RootState is defined in your Redux store setup
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
import { useNavigate } from "react-router-dom";

interface SearchParams {
	departureCity: string;
	arrivalCity: string;
	departureDate: dayjs.Dayjs;
	returnDate: dayjs.Dayjs | null;
	passenger: number;
	flightClass: string;
}

const SearchFlight: React.FC = () => {

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useState < SearchParams > ({
		departureCity: "",
		arrivalCity: "",
		departureDate: dayjs(new Date()),
		returnDate: null,
		passenger: 1,
		flightClass: "Economy",
	});

	// const { departureFlight } = useSelector(
	// 	(state: RootState) => state.departureflight
	// );
  // const { returnFlight } = useSelector(
  //   (state: RootState) => state.returnflight
  // )
	// console.log(departureFlight, 'departureFlight');
	// console.log(returnFlight, 'returnFlight');

	const dispatch = useDispatch();

	const URL = process.env.REACT_APP_BACKEND_API;

	const handleInputChange = (name: keyof SearchParams, value: any) => {
		setSearchParams((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSearchFlight = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

			if (returnDate && departureDate.isAfter(returnDate, "day")) {
				return toast.error(
					`Return date should be equal to or greater than departure date`
				);
			}
			if (
				getDate(departureDate) === getDate(new Date()) &&
				getCurrentTime() >= "23:00"
			) {
				handleInputChange(
					"departureDate",
					departureDate.add(1, "day")
				);
			}

			dispatch(setDepartureCity(departureCity));
			dispatch(setArrivalCity(arrivalCity));
			dispatch(setDepartureDate(departureDate?.toISOString()));
			dispatch(setReturnDate(returnDate ? returnDate?.toISOString() : null));
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
			let time1 = getCurrentTime();
			let time2 = getCurrentTime();
      
			time1 = getDate(departureDate) !== getDate(new Date()) ? "23:00" : time1;
			time2 = returnDate && getDate(returnDate) !== getDate(new Date()) ? "23:00" : time2;

			const [response, returnResponse] = await Promise.all([
				axios.get(`${URL}/flights`, {
					params: {
						departureAirportId,
						arrivalAirportId,
						time1,
					},
				}),
				returnDate &&
				axios.get(`${URL}/flights`, {
					params: {
						arrivalAirportId: departureAirportId,
						departureAirportId: arrivalAirportId,
						time2,
					},
				}),
			]);

			dispatch(setDepartureFlight(response?.data?.data));
			if (returnResponse) {
				dispatch(setReturnFlight(returnResponse?.data?.data));
			}
			navigate('/search-flights')
			
		} catch (error) {
			toast.error("An error occurred while searching for flights");
			console.error(error);
		}
	};

	return (
		<div className="bg-white p-4 space-y-5 w-max rounded-2xl search-flight-main">
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
					setArrivalCity={(value) =>
						handleInputChange("arrivalCity", value)
					}
				/>
				<DepartureDate
					departureDate={searchParams.departureDate}
					setDepartureDate={(value: any) =>
						handleInputChange("departureDate", value)
					}
				/>
				<ReturnDate
					returnDate={searchParams.returnDate}
					setReturnDate={(value) =>
						handleInputChange("returnDate", value)
					}
				/>
				<Passenger
					passenger={searchParams.passenger}
					setPassenger={(value) =>
						handleInputChange("passenger", value)
					}
					flightClass={searchParams.flightClass}
					setFlightClass={(value) =>
						handleInputChange("flightClass", value)
					}
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
