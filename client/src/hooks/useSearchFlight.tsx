import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAirportId } from "../redux/airports/airportAction";
import { getFlightsData } from "../redux/flights/flightsAction";
import { setFilterTime, setMaxPrice, setMinPrice } from "../redux/flights/flightSlice";
import { setArrivalCity, setDepartureCity, setDepartureDate, setPassenger, setReturnDate } from "../redux/searchSlice";
import { AppDispatch } from "../redux/store";
import { getCurrentTime, getDate } from "../utils/Date";

interface SearchParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: Dayjs;
  returnDate: Dayjs | null;
  passenger: number;
}

const useSearchFlights = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchFlights = async (searchParams: SearchParams) => {
    try {
      const { departureCity, arrivalCity, departureDate, returnDate, passenger } = searchParams;

      if (!departureCity || !arrivalCity) {
        return toast.error("Select the cities to search for flights");
      }

      if (departureCity === arrivalCity) {
        return toast.error("Departure and Arrival City can't be the same");
      }

      if (returnDate && departureDate.isAfter(returnDate, "day")) {
        return toast.error("Return date should be equal to or greater than departure date");
      }

      if (
        getDate(departureDate) === getDate(new Date()) &&
        getCurrentTime() >= "23:00"
      ) {
        searchParams.departureDate = departureDate.add(1, "day");
      }

      dispatch(setDepartureCity(departureCity));
      dispatch(setArrivalCity(arrivalCity));
      dispatch(setDepartureDate(departureDate));
      dispatch(setReturnDate(returnDate ? returnDate : null));
      dispatch(setPassenger(passenger));
      dispatch(setMinPrice(2000));
      dispatch(setMaxPrice(50000));
      dispatch(setFilterTime(null));

      const departureCityDetails = await dispatch(getAirportId({ city: departureCity }));
      const arrivalCityDetails = await dispatch(getAirportId({ city: arrivalCity }));

      const departureAirportId = departureCityDetails.payload.id;
      const arrivalAirportId = arrivalCityDetails.payload.id;
      let time1 = getCurrentTime();
      let time2 = getCurrentTime();

      time1 = getDate(departureDate) !== getDate(new Date()) ? "23:00" : time1;
      time2 = returnDate && getDate(returnDate) !== getDate(new Date()) ? "23:00" : time2;

      dispatch(
        getFlightsData({
          departureAirportId,
          arrivalAirportId,
          date: departureDate,
          time: time1,
          type: "Departure",
          page: 1,
        })
      );

      if (returnDate != null) {
        dispatch(
          getFlightsData({
            departureAirportId: arrivalAirportId,
            arrivalAirportId: departureAirportId,
            date: returnDate,
            time: time2,
            type: "Return",
            page: 1,
          })
        );
      }
    } catch (error) {
      toast.error("An error occurred while searching for flights");
      console.error(error);
    }
  };

  return searchFlights;
};

export default useSearchFlights;
