import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AppDispatch } from "../redux/store";
import { validateEmail } from "../redux/user/userAction";

const ValidateEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const emailSchema = z.string().email("Please enter a valid email address.");

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
    } else {
      setEmailError(null);
      const res = await dispatch(validateEmail({ email }));
      if (res.payload) {
        toast.success('Change password link sent to email');
        navigate("/auth");
      } else {
        toast.error("Email doesn't exist");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white items-center justify-center p-8">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-6 w-[90%] sm:w-[65%] md:w-[80%] lg:w-[60%]">
            <h2 className="text-3xl font-semibold text-gray-900 text-center max-xs:text-2xl">
              Change Password 🔑
            </h2>
          </div>

          <form
            className="w-[90%] sm:w-[65%] md:w-[80%] lg:w-[60%]"
            onSubmit={handleNext}
          >
            <div className="relative mb-4">
              <TextInput
                label="Email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                className="w-full"
                type="email"
                error={emailError}
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="bg-[#162D3A] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:w-1/2 md:flex items-center justify-center">
        <img
          src={require("../assets/signupImage.jpg")}
          className="h-[95%] w-[95%] object-cover rounded-xl"
          alt="Change Password"
        />
      </div>
    </div>
  );
};

export default ValidateEmail;
