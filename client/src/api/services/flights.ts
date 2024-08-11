import { GET_AIRPORT, GET_FLIGHTS } from "../api";
import { http } from "../http";

class flights {
  getAirportData(data: object) {
    return http.get(GET_AIRPORT, data);
  }
  getFlightsData(params: object){
    return http.get(GET_FLIGHTS, params);
  }
  getFlight(flightId: string){
    return http.get(`${GET_FLIGHTS}/${flightId}`);
  }
}

export default new flights()