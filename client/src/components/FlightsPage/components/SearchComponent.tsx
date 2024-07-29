import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAirportId } from "../../../redux/airports/airportAction";
import { getFlightsData } from "../../../redux/flights/flightsAction";
import { setLoading } from "../../../redux/loadingSlice";
import {
  setArrivalCity,
  setDepartureCity,
  setDepartureDate,
  setPassenger,
  setReturnDate,
} from "../../../redux/searchSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { getCurrentTime, getDate } from "../../../utils/Date";
import CitySelect from "../../common/CitySelect";
import DepartureDate from "../../common/DepartureDate";
import Passenger from "../../common/Passenger";
import ReturnDate from "../../common/ReturnDate";
import Button from "../../common/Button";

interface SearchParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: Dayjs;
  returnDate: Dayjs | null;
  passenger: number;
}

const SearchComponent = () => {
  const { departureCity, arrivalCity, departureDate, returnDate, passenger } =
    useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: departureCity || "",
    arrivalCity: arrivalCity || "",
    departureDate: departureDate || dayjs(new Date()),
    returnDate: returnDate || null,
    passenger: passenger || 1,
  });

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
        handleInputChange("departureDate", departureDate.add(1, "day"));
      }
      dispatch(setLoading(true));
      dispatch(setDepartureCity(departureCity));
      dispatch(setArrivalCity(arrivalCity));
      dispatch(setDepartureDate(departureDate));
      dispatch(setReturnDate(returnDate ? returnDate : null));
      dispatch(setPassenger(passenger));

      const departureCityDetails = await dispatch(
        getAirportId({ city: departureCity })
      );
      const arrivalCityDetails = await dispatch(
        getAirportId({ city: arrivalCity })
      );

      const departureAirportId = departureCityDetails.payload.id;
      const arrivalAirportId = arrivalCityDetails.payload.id;
      let time1 = getCurrentTime();
      let time2 = getCurrentTime();

      time1 = getDate(departureDate) !== getDate(new Date()) ? "23:00" : time1;
      time2 =
        returnDate && getDate(returnDate) !== getDate(new Date())
          ? "23:00"
          : time2;

      dispatch(
        getFlightsData({
          departureAirportId,
          arrivalAirportId,
          date: departureDate,
          time: time1,
          type: "Departure",
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
          })
        );
      }
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("An error occurred while searching for flights");
      console.error(error);
    }
  };

  return (
    <div className="w-[100%] py-4 px-1 flex flex-wrap justify-center items-stretch gap-6 mx-1">
      <div className="min-sm:flex-1">
        <CitySelect
          departureCity={searchParams.departureCity}
          setDepartureCity={(value) => handleInputChange("departureCity", value)}
          arrivalCity={searchParams.arrivalCity}
          setArrivalCity={(value) => handleInputChange("arrivalCity", value)}
        />
      </div>
      <DepartureDate
        departureDate={searchParams.departureDate}
        setDepartureDate={(value: Dayjs) => handleInputChange("departureDate", value)}
      />
      <ReturnDate
        returnDate={searchParams.returnDate}
        setReturnDate={(value) => handleInputChange("returnDate", value)}
      />
      <Passenger
        passenger={searchParams.passenger}
        setPassenger={(value: number) => handleInputChange("passenger", value)}
      />
      <div>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSearchFlight(e)}
        >
          Search Flights <CiSearch size="30px" />
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
