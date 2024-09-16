import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSearchFlights from "../../hooks/useSearchFlight";
import { getAirportId } from "../../redux/airports/airportAction";
import {
  Flight,
  setisDeparture
} from "../../redux/flights/flightSlice";
import { getFlightsData } from "../../redux/flights/flightsAction";
import { AppDispatch, RootState } from "../../redux/store";
import { getCurrentTime, getDate, getTime } from "../../utils/Date";
import FlightCard from "./components/FlightCard";
import FlightSummary from "./components/FlightSummary";

const FlightSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    departureFlight,
    returnFlight,
    departurePage,
    returnPage,
    totalDeparturePages,
    totalReturnPages,
    isDeparture,
    filterTime,
    maxPrice,
    minPrice,
    departureAirportId,
    returnAirportId,
  } = useSelector((state: RootState) => state.flight);
  const { departureCity, arrivalCity, departureDate, returnDate, passenger } =
    useSelector((state: RootState) => state.search);
  const singleFlight = useSelector((state: RootState) => state.singleFlight);
  const singleReturnFlight = useSelector(
    (state: RootState) => state.singleReturnFlight
  );

  const searchFlights = useSearchFlights();

  const [flightsArray, setFlightsArray] = useState<Flight[]>(departureFlight);

  useEffect(() => {
    setFlightsArray(isDeparture ? departureFlight : returnFlight);
  }, [departureFlight, returnFlight, dispatch, isDeparture]);

  const fetchMoreFlights = async (type: "Departure" | "Return") => {
    try {
      const departureCityDetails = await dispatch(
        getAirportId({ city: departureCity })
      );
      const arrivalCityDetails = await dispatch(
        getAirportId({ city: arrivalCity })
      );

      const departureAirportId = departureCityDetails.payload.id;
      const arrivalAirportId = arrivalCityDetails.payload.id;

      const time =
        getDate(departureDate) !== getDate(new Date())
          ? "23:00"
          : getCurrentTime();
      const returnTime =
        returnDate && getDate(returnDate) !== getDate(new Date())
          ? "23:00"
          : getCurrentTime();

      const flightParams = {
        departureAirportId:
          type === "Departure" ? departureAirportId : arrivalAirportId,
        arrivalAirportId:
          type === "Departure" ? arrivalAirportId : departureAirportId,
        date: type === "Departure" ? departureDate : returnDate!,
        time: filterTime ? getTime(filterTime) : type === "Departure" ? time : returnTime,
        type,
        maxPrice,
        minPrice,
        page: type === "Departure" ? departurePage + 1 : returnPage + 1,
      };

      await dispatch(getFlightsData(flightParams));

    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };

  const handleViewMore = () => {
    fetchMoreFlights(isDeparture ? "Departure" : "Return");
  };

  const handleToggle = () => {
    dispatch(setisDeparture(!isDeparture));
    const searchParams = {
      departureCity: departureCity,
      arrivalCity: arrivalCity,
      departureDate: departureDate,
      returnDate: returnDate,
      passenger: passenger,
      filterTime: filterTime,
      maxPrice: maxPrice,
      minPrice: minPrice,
    };

    searchFlights(searchParams);
  };

  const flightsCompatible = (): boolean => {
    const [departureHour, departureMinute] = singleFlight.arrivalTime.split(":").map(Number);
    const [returnHour, returnMinute] = singleReturnFlight.departureTime.split(":").map(Number);
  
    const departureDateTime = departureDate
      .add(singleFlight.nextDay, "day")
      .set("hour", departureHour)
      .set("minute", departureMinute);
    const returnDateTime = returnDate!
      .set("hour", returnHour)
      .set("minute", returnMinute);

    if (departureDateTime.isAfter(returnDateTime)) {
      return false;
    }
  
    if (
      departureDateTime.isSame(returnDateTime, "day") &&
      departureDateTime.add(59, "minutes").isAfter(returnDateTime)
    ) {
      return false;
    }
  
    return true;
  };
  const handleProceed = () => {
    if (!departureAirportId || !returnAirportId) {
      toast.error("Please select both flights to proceed.");
      return;
    }
    if(!flightsCompatible()){
      toast.error("There should atleas 1 hour gap between both flights");
      return;
    }
    navigate(`/passenger-details/${departureAirportId}/${returnAirportId}`);
  };

  return (
    <>
      {returnDate && (
        <div className="flex justify-center my-4">
          <div className="flex bg-white w-auto rounded-full border border-gray-200 shadow-lg mb-8">
            <div
              className={`py-2 px-6 rounded-full cursor-pointer ${
                isDeparture ? "bg-orange-400 text-gray-100" : "text-gray-700"
              }`}
              onClick={() => handleToggle()}
            >
              Departure
            </div>
            <div
              className={`py-2 px-6 rounded-full cursor-pointer ${
                !isDeparture ? "bg-orange-400 text-gray-100" : "text-gray-700"
              }`}
              onClick={() => handleToggle()}
            >
              Return
            </div>
          </div>
        </div>
      )}
      <div className={`flex flex-col items-center gap-10 mx-10 ${!returnDate ? 'mb-14' : 'mb-36'}`}>
        {flightsArray?.length === 0 ? (
          <div className="text-gray-500 text-lg">No flights available</div>
        ) : (
          flightsArray.map((item: Flight, index: number) => (
            <FlightCard key={index} flight={item} isDeparture={isDeparture} />
          ))
        )}
        {(isDeparture
          ? departurePage < totalDeparturePages
          : returnPage < totalReturnPages) && (
          <div
            className="flex justify-center items-center h-full cursor-pointer"
            onClick={handleViewMore}
          >
            <div className="bg-white w-max py-2 px-4 rounded-full shadow-lg text-blue-500">
              View more
            </div>
          </div>
        )}
      </div>

      {returnDate && <FlightSummary handleProceed={handleProceed} />}
    </>
  );
};

export default FlightSection;
