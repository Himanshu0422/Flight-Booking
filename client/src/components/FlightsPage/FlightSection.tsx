import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAirportId } from "../../redux/airports/airportAction";
import {
  Flight,
  increaseDeparturePage,
  increaseReturnPage,
  setisDeparture,
} from "../../redux/flights/flightSlice";
import { getFlightsData } from "../../redux/flights/flightsAction";
import { AppDispatch, RootState } from "../../redux/store";
import { getCurrentTime, getDate } from "../../utils/Date";
import FlightCard from "./components/FlightCard";

const FlightSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    departureFlight,
    returnFlight,
    departurePage,
    returnPage,
    totalDeparturePages,
    totalReturnPages,
    isDeparture
  } = useSelector((state: RootState) => state.flight);

  const { departureCity, arrivalCity, departureDate, returnDate } =
    useSelector((state: RootState) => state.search);

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
        time: type === "Departure" ? time : returnTime,
        type,
        page: type === "Departure" ? departurePage + 1 : returnPage + 1,
      };

      await dispatch(getFlightsData(flightParams));

      if (type === "Departure") {
        dispatch(increaseDeparturePage());
      } else {
        dispatch(increaseReturnPage());
      }
    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };

  const handleViewMore = () => {
    fetchMoreFlights(isDeparture ? "Departure" : "Return");
  };

  const flightsArray = isDeparture ? departureFlight : returnFlight;
  const isFlightsEmpty = flightsArray.length === 0;

  return (
    <>
      {returnDate && (
        <div className="flex justify-center my-4">
          <div className="flex bg-white w-auto rounded-full border border-gray-200 shadow-lg mb-8">
            <div
              className={`py-2 px-6 rounded-full cursor-pointer ${
                isDeparture ? "bg-orange-400 text-gray-100" : "text-gray-700"
              }`}
              onClick={() => dispatch(setisDeparture(true))}
            >
              Departure
            </div>
            <div
              className={`py-2 px-6 rounded-full cursor-pointer ${
                !isDeparture ? "bg-orange-400 text-gray-100" : "text-gray-700"
              }`}
              onClick={() => dispatch(setisDeparture(false))}
            >
              Return
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-10 mx-10">
        {isFlightsEmpty ? (
          <div className="text-gray-500 text-lg">No flights available</div>
        ) : (
          flightsArray.map((item: Flight, index: number) => (
            <FlightCard key={index} flight={item} isDeparture={isDeparture} />
          ))
        )}
        <div className="h-6" />
      </div>
      {(isDeparture
        ? departurePage < totalDeparturePages
        : returnPage < totalReturnPages) && (
        <div
          className="flex justify-center items-center h-full mb-8 cursor-pointer"
          onClick={handleViewMore}
        >
          <div className="bg-white w-max py-2 px-4 rounded-full shadow-lg text-blue-500">
            View more
          </div>
        </div>
      )}
    </>
  );
};

export default FlightSection;
