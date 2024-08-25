import { BOOK_FLIGHT, BOOKINGS, GET_BOOKING_BYID } from "../api";
import { bookingHttp } from "../bookingHttp";


class booking{
  bookFlight(payload: object){
    return bookingHttp.post(BOOK_FLIGHT, payload)
  }
  bookings(payload: object){
    return bookingHttp.post(BOOKINGS, payload);
  }
  getBookingById(payload: object){
    return bookingHttp.post(GET_BOOKING_BYID, payload);
  }
}

export default new booking()