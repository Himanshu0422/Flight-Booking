import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFlight } from "../redux/flights/flightsAction";
import { AppDispatch, RootState } from "../redux/store";
import FlightCard from "../components/PassengerDetails/FlightCard";
import PassengerCard from "../components/PassengerDetails/PassengerCard";
import { addPassenger } from "../redux/passengers/passengerActions";
import { Passenger } from "../redux/passengers/passengerReducer";
import DetailsCard from "../components/PassengerDetails/DetailsCard";
import OrderDetailsCard from "../components/PassengerDetails/OrderDetailsCard";
import { bookFlight } from "../redux/flights/bookingAction";

const PassengerDetails = () => {
  const { flightId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const singleFlight = useSelector((state: RootState) => state.singleFlight);
  const { passenger } = useSelector((state: RootState) => state.search);
  const { passengers } = useSelector((state: RootState) => state.passengers);


  const allDetailsFilled = () => {
    return passengers.every(
      (p: Passenger) => p.name && p.email && p.phoneNumber && p.dob && p.gender && p.countryCode
    );
  };

  useEffect(() => {
    dispatch(getFlight(flightId!));
  }, [dispatch, flightId]);

  const handleAddPassenger = () => {
    if(passengers.length === passenger){
      alert(`You can only add ${passenger} passengers`);
      return;
    }
    dispatch(addPassenger());
  };

  const handleSubmit = () => {
    if (passengers.length !== passenger) {
      alert("Please add all passenger details before submitting.");
    } else {
      if(!allDetailsFilled()){
        alert("Please fill all the details of passenger.");
        return;
      }
      const bookingData = {
        "flightId": singleFlight.flightNumber,
        "userId": 1,
        "bookedSeats": passenger
      }
      const payload = {
        bookingData,
        passengersData: passengers
      }
      console.log(payload);
      
      dispatch(bookFlight(payload))
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-75px)] py-10 flex flex-col items-center space-y-5">
      <div className="w-[50%] max-lg:w-[70%] max-md:w-[90%]">
        <div className="text-2xl font-bold">Booking Details</div>
        <div className="text-sm text-gray-600">
          Fill in your personal data and review your order
        </div>
      </div>
      {singleFlight.departureTime && <FlightCard flight={singleFlight} />}
      <OrderDetailsCard passenger={passenger} baseFare={singleFlight.price} />
      <DetailsCard />
      {passengers.map((passenger: Passenger, index: number) => (
        <PassengerCard key={index} passenger={passenger} index={index} isInternational={singleFlight.isInternational} />
      ))}
      <button
        onClick={handleAddPassenger}
        className="mt-4 border border-blue-500 text-blue-500 py-2 px-4 rounded w-[50%] max-lg:w-[70%] max-md:w-[90%]"
      >
        Add Passenger
      </button>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-orange-400 text-white py-2 px-4 rounded w-[50%] max-lg:w-[70%] max-md:w-[90%]"
      >
        Book Now
      </button>
    </div>
  );
};

export default PassengerDetails;
