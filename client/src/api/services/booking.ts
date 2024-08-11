import { BOOK_FLIGHT } from "../api";
import { bookingHttp } from "../bookingHttp";


class booking{
  bookFlight(payload: object){
    return bookingHttp.post(BOOK_FLIGHT, payload)
  }
}

export default new booking()