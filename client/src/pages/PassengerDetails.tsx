import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DetailsCard from "../components/PassengerDetails/DetailsCard";
import FlightCard from "../components/PassengerDetails/FlightCard";
import OrderDetailsCard from "../components/PassengerDetails/OrderDetailsCard";
import PassengerCard from "../components/PassengerDetails/PassengerCard";
import { bookFlight } from "../redux/flights/bookingAction";
import { getFlight } from "../redux/flights/flightsAction";
import { addPassenger, emptyPassengers } from "../redux/passengers/passengerActions";
import { Passenger } from "../redux/passengers/passengerReducer";
import { AppDispatch, RootState } from "../redux/store";
import { resetState } from "../redux/flights/flightSlice";
import { resetSingleFlight } from "../redux/flights/singleFlightSlice";
declare var Razorpay: any;

const PassengerDetails = () => {
  const { flightId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const singleFlight = useSelector((state: RootState) => state.singleFlight);
  const user = useSelector((state: RootState) => state.user);
  const { passenger } = useSelector((state: RootState) => state.search);
  const { passengers } = useSelector((state: RootState) => state.passengers);

  const allDetailsFilled = () => {
    return passengers.every(
      (p: Passenger) =>
        p.name && p.email && p.phoneNumber && p.dob && p.gender && p.countryCode
    );
  };

  useEffect(() => {
    dispatch(getFlight(flightId!));
  }, [dispatch, flightId]);

  const handleAddPassenger = () => {
    if (passengers.length === passenger) {
      toast.error(`You can only add ${passenger} passengers`);
      return;
    }
    dispatch(addPassenger());
  };

  const payment = async (bookingData: any, booking_id: number) => {
    try {
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_BOOKING_API}/payment/razorpay`,
        {
          booking_id: booking_id.toString(),
          amount: singleFlight.price * bookingData.bookedSeats + (singleFlight.price * bookingData.bookedSeats) * 0.10,
          user_id: user.id,
        }
      );

      const options = {
        key: process.env.RAZORPAY_KEY,
        amount: paymentResponse.data.amount,
        currency: paymentResponse.data.currency,
        order_id: paymentResponse.data.id,
        handler: async (response: any) => {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_BOOKING_API}/payment/verify`,
            {
              ...response,
              booking_id: booking_id,
            }
          );
          toast.success("Payment successful and booking confirmed");
          dispatch(emptyPassengers());
          dispatch(resetState());
          dispatch(resetSingleFlight());
          navigate("/home");
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  const handleSubmit = async () => {
    if (passengers.length !== passenger) {
      toast.error("Please add all passenger details before submitting.");
    } else {
      if (!allDetailsFilled()) {
        toast.error("Please fill all the details of passenger.");
        return;
      }
      const bookingData = {
        flightId: singleFlight.flightNumber,
        userId: 1,
        bookedSeats: passenger,
      };
      const payload = {
        bookingData,
        passengersData: passengers,
      };
      const res = await dispatch(bookFlight(payload));
      payment(bookingData, res.payload.data.booking.id);
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
        <PassengerCard
          key={index}
          passenger={passenger}
          index={index}
          isInternational={singleFlight.isInternational}
        />
      ))}
      <button
        onClick={handleAddPassenger}
        className="mt-4 border border-blue-500 text-blue-500 py-2 px-4 rounded w-[50%] max-lg:w-[70%] max-md:w-[90%]"
      >
        Add Passenger
      </button>
      <button
        onClick={() => handleSubmit()}
        className="mt-4 bg-orange-400 text-white py-2 px-4 rounded w-[50%] max-lg:w-[70%] max-md:w-[90%]"
      >
        Book Now
      </button>
    </div>
  );
};

export default PassengerDetails;
