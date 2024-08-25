import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../components/HistoryPage/BookingCard";
import { bookings } from "../redux/bookings/bookingAction";
import { AppDispatch, RootState } from "../redux/store";

const History = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const booking = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    dispatch(bookings({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-75px)] flex flex-col items-center py-10 gap-10">
      <div className="text-2xl font-bold">History</div>
      {booking.bookings.length === 0 ? (
        <div>No booking history</div>
      ) : (
        booking.bookings.map((item, index) => (
          <>
            <BookingCard key={item} booking={item} />
          </>
        ))
      )}
    </div>
  );
};

export default History;
