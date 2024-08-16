import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { sendOtp, verifyOtp } from "../redux/user/userAction";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {email} = useSelector((state:RootState) => state.user);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const handleVerify = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length === 5) {
      const payload = {
        email: email,
        otp: otp
      }
      try {
        await dispatch(verifyOtp(payload)).unwrap()
        toast.success('Otp verified')
        navigate("/home");
      } catch (error:any) {
        toast.error(error.response.data.message);
      }
    } else {
      setOtpError("Please enter a valid 5-digit OTP.");
    }
  };

  const sendOtpToEmail = async () => {
    try {
      await dispatch(sendOtp({email: email})).unwrap();
      toast.success('Otp sent successfully')
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    sendOtpToEmail();
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white items-center justify-center p-8">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]">
            Verify OTP 📩
          </h2>
          <form
            className="w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]"
            onSubmit={handleVerify}
          >
            <div className="mb-4">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={5}
                containerStyle="otp-container"
                inputStyle="otp-input"
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    className="w-[48px] lg:w-[60px] border bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                  />
                )}
              />
              {otpError && (
                <p className="text-red-500 text-sm mt-2">{otpError}</p>
              )}
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-[#162D3A] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:w-1/2 md:flex items-center justify-center">
        <img
          src={require("../assets/signupImage.jpg")}
          className="h-[95%] w-[95%] object-cover rounded-xl"
          alt="Verify OTP"
        />
      </div>
    </div>
  );
};

export default VerifyOTP;
