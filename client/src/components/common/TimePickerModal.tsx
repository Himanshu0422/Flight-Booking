import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterTime } from "../../redux/flights/flightSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { setLoading } from "../../redux/loadingSlice";
import { getCurrentTime, getDate, getTime } from "../../utils/Date";
import { getAirportId } from "../../redux/airports/airportAction";
import { getFlightsData } from "../../redux/flights/flightsAction";

export default function TimePickerModal({
  timeFilter,
  setTimeFilter,
}: {
  timeFilter: boolean;
  setTimeFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { filterTime, isDeparture, minPrice, maxPrice } = useSelector(
    (state: RootState) => state.flight
  );
  const { departureCity, arrivalCity, departureDate, returnDate, passenger } =
    useSelector((state: RootState) => state.search);

  const handleClose = () => {
    setTimeFilter(false);
  };

  const handleTimeChange = (newValue: any) => {
    dispatch(setFilterTime(newValue));
  };

  const fetchMoreFlights = async (type: "Departure" | "Return") => {
    dispatch(setLoading(true));
    try {
      const departureCityDetails = await dispatch(
        getAirportId({ city: departureCity })
      );
      const arrivalCityDetails = await dispatch(
        getAirportId({ city: arrivalCity })
      );

      const departureAirportId = departureCityDetails.payload.id;
      const arrivalAirportId = arrivalCityDetails.payload.id;

      const flightParams = {
        departureAirportId:
          type === "Departure" ? departureAirportId : arrivalAirportId,
        arrivalAirportId:
          type === "Departure" ? arrivalAirportId : departureAirportId,
        date: type === "Departure" ? departureDate : returnDate!,
        time: getTime(filterTime),
        type,
        page: 1,
        minPrice,
        maxPrice,
      };

      await dispatch(getFlightsData(flightParams));

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Error fetching more flights:", error);
    }
  };

  const applyFilter = () => {
    handleClose();
    if (isDeparture) {
      fetchMoreFlights("Departure");
    } else {
      fetchMoreFlights("Return");
    }
  };

  return (
    <Dialog open={timeFilter} onClose={handleClose}>
      <DialogTitle>Select Time</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Time"
              value={filterTime}
              onChange={handleTimeChange}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={applyFilter} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
