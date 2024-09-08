import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { sendOtp, updateUser, verifyOtp } from "../redux/user/userAction";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { id, email } = useSelector((state: RootState) => state.user);

  const [otp, setOtp] = useState("");
  const [otpsent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(email);

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isChangingEmail) {
      try {
        await dispatch(updateUser({id, email:newEmail})).unwrap();
        await dispatch(sendOtp({ email: newEmail })).unwrap();
        toast.success("OTP sent to new email successfully");
        setIsChangingEmail(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      if (otp.length === 5) {
        const payload = {
          email: newEmail,
          otp: otp,
        };
        try {
          await dispatch(verifyOtp(payload)).unwrap();
          toast.success("OTP verified");
          navigate("/home");
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      } else {
        setOtpError("Please enter a valid 5-digit OTP.");
      }
    }
  };

  const sendOtpToEmail = async () => {
    try {
      await dispatch(sendOtp({ email: email })).unwrap();
      toast.success("OTP sent successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(otpsent === false){
      sendOtpToEmail();
      setOtpSent(true);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white items-center justify-center p-8">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]">
            {isChangingEmail ? "Change Email" : "Verify OTP 📩"}
          </h2>
          <form
            className="w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]"
            onSubmit={handleVerify}
          >
            {isChangingEmail ? (
              // Email input field if changing email
              <div className="mb-4">
                <input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                  placeholder="Enter new email"
                  className="w-full p-2 border bg-richblack-800 rounded-[0.5rem] text-richblack-5"
                />
              </div>
            ) : (
              // OTP input field if verifying OTP
              <>
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
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                      />
                    )}
                  />
                  {otpError && (
                    <p className="text-red-500 text-sm mt-2">{otpError}</p>
                  )}
                </div>

                <div className="flex items-center justify-end mt-2 cursor-pointer">
                <a
                  className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-700"
                  onClick={() => setIsChangingEmail(true)}
                >
                  Change Email?
                </a>
              </div>
              </>
            )}

            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-[#162D3A] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isChangingEmail ? "Next" : "Verify OTP"}
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
