import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login, signUp } from "../redux/user/userAction";
import { AppDispatch, RootState } from "../redux/store";
import { setEmail } from "../redux/user/userSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isLogin, setIsLogin] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleAuthMode = () => {
    setFormData({ name: "", email: "", password: "" });
    setIsLogin((prevMode) => !prevMode);
  };

  const emailSchema = z.string().email('Please enter a valid email address.');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const result = emailSchema.safeParse(value);
      if (!result.success) {
        setEmailError(result.error.errors[0].message);
      } else {
        setEmailError(null);
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password
    }
    try {
      dispatch(setEmail(formData.email))
      await dispatch(login(payload)).unwrap();
      toast.success('Login successfull')
      navigate('/home')
    } catch (error:any) {
      if (error.otpVerified === false) {
        navigate('/verify-otp');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    try {
      const res = await dispatch(signUp(payload)).unwrap();
      toast.success('User created')
      navigate('/verify-otp');
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  };

  async function handleGoogleAuth() {
    try {
      const response = await fetch('http://localhost:5000/auth/google/callback', {
        method: 'POST',
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (data.success) {
        Cookies.set('token', data.token, {expires: 7});
        window.location.href = 'http://localhost:3000/home';
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white items-center justify-center p-8">
        <div className="flex items-center justify-center mb-6 h-[20%]">
          <div className="bg-gray-200 p-1 rounded-full flex items-center w-full max-w-xs">
            <button
              onClick={toggleAuthMode}
              className={`${
                isLogin ? "bg-black text-white" : "text-black"
              } py-2 px-4 rounded-full focus:outline-none w-1/2`}
            >
              Sign In
            </button>
            <button
              onClick={toggleAuthMode}
              className={`${
                !isLogin ? "bg-black text-white" : "text-black"
              } py-2 px-4 rounded-full focus:outline-none w-1/2`}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>
          <form
            className="w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[70%] llg:w-[55%]"
            onSubmit={isLogin ? handleLogin : handleSignUp}
          >
            {!isLogin && (
              <TextInput
                key="name"
                label={"Name"}
                placeholder="Enter name"
                className="w-full mb-4"
                type="text"
                onChange={handleChange}
                value={formData.name}
                name="name"
                styles={{
                  input: {
                    borderRadius: "8px",
                    backgroundColor: "#F7FBFF",
                    height: '40px'
                  },
                }}
              />
            )}
            <TextInput
              key="email"
              label={"Email"}
              placeholder="Enter email"
              className="w-full"
              type="email"
              name="email"
              error={emailError}
              value={formData.email}
              onChange={handleChange}
              styles={{
                input: {
                  borderRadius: "8px",
                  backgroundColor: "#F7FBFF",
                  height: '40px'
                },
              }}
            />
            <TextInput
              key="password"
              label={"Password"}
              placeholder="Enter password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full my-4"
              styles={{
                input: {
                  borderRadius: "8px",
                  backgroundColor: "#F7FBFF",
                  height: '40px'
                },
              }}
            />
            {isLogin && (
              <div className="flex items-center justify-end mt-2">
                <a
                  className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-700"
                  href="/"
                >
                  Forgot Password?
                </a>
              </div>
            )}
            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-[#162D3A] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
          <div className="my-4 flex items-center justify-center w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]">
            <div className="border-b w-full"></div>
            <span className="mx-4 text-sm text-gray-500">Or</span>
            <div className="border-b w-full"></div>
          </div>
          <div className="flex flex-col space-y-4 w-[90%] sm:w-[65%] mmd:w-[50%] md:w-[80%] lg:w-[60%] llg:w-[50%]">
            <button
              className="text-gray-700 font-medium py-2 px-4 rounded-md flex items-center justify-center bg-[#F7FBFF]"
              type="button"
              onClick={() => {
                window.location.href = 'http://localhost:4002/api/v1/google';
                handleGoogleAuth()
              }}
            >
              <img
                src={require('../assets/google.png')}
                alt="Google"
                className="mr-2 h-6"
              />
              Sign in with Google
            </button>
            <button
              className="text-gray-700 font-medium py-2 px-4 rounded-md flex items-center justify-center bg-[#F7FBFF]"
              type="button"
            >
              <img
                src={require('../assets/facebook.png')}
                alt="Facebook"
                className="mr-2 h-6"
              />
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:w-1/2 md:flex items-center justify-center">
        <img
          src={require("../assets/signupImage.jpg")}
          className="h-[95%] w-[95%] object-cover rounded-xl"
          alt="Signup"
        />
      </div>
    </div>
  );
};

export default Signup;
