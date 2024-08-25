import { LOGIN, SEND_OTP, SIGN_UP, UPDATE_USER, USER, VERIFY_OTP } from "../api";
import { authHttp } from "../authHttp";


class user {
  signUp(data: object){
    return authHttp.post(SIGN_UP, data);
  }
  login(data: object){
    return authHttp.post(LOGIN, data);
  }
  sendOtp(data: object){
    return authHttp.post(SEND_OTP, data);
  }
  verifyOtp(data: object){
    return authHttp.post(VERIFY_OTP, data);
  }
  getUser(token:string){
    return authHttp.get(USER, undefined, 'application/json', token)
  }
  updateUser(payload: object){
    return authHttp.post(UPDATE_USER, payload)
  }
}

export default new user()