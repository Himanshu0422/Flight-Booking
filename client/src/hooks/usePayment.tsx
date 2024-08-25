import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/flights/flightSlice";
import { resetSingleFlight } from "../redux/flights/singleFlightSlice";
import { emptyPassengers } from "../redux/passengers/passengerActions";
import { RootState } from "../redux/store";
declare var Razorpay: any;

const usePayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const singleFlight = useSelector((state: RootState) => state.singleFlight); 
  const singleReturnFlight = useSelector((state: RootState) => state.singleReturnFlight);

  const processPayment = useCallback(async (bookedSeats: any, price:number,  booking_id: number) => {
    try {
      const totalAmount = price * bookedSeats;
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_BOOKING_API}/payment/razorpay`,
        {
          booking_id: booking_id,
          amount: totalAmount + totalAmount * 0.10,
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
              email: user.email,
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
  }, [dispatch, navigate, singleFlight.price, singleReturnFlight.price, user.email, user.id, user.name]);

  return { processPayment };
};

export default usePayment;
