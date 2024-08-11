import { GET_ALL_AIRPORTS } from "../api"
import { http } from "../http"


class airport{
  getAllAirports() {
    return http.get(GET_ALL_AIRPORTS);
  }
}

export default new airport()