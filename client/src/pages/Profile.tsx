import { TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import { z } from "zod";
import { AppDispatch, RootState } from "../redux/store";
import { updateUser, validateEmail } from "../redux/user/userAction";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    countryCode: user.countryCode,
  });
  const [initialData, setInitialData] = useState(profileData);

  useEffect(() => {
    setProfileData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      countryCode: user.countryCode || '+91',
    });
    setInitialData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      countryCode: user.countryCode || '+91',
    });
  }, [user.email]);

  const [emailError, setEmailError] = useState<string | null>(null);

  const emailSchema = z.string().email("Please enter a valid email address.");

  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        label: country.label,
        value: country.value,
      }));
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "email") {
      const result = emailSchema.safeParse(value);
      setEmailError(result.success ? null : result.error.errors[0].message);
    }
  };

  const handleSave = async () => {
    if (profileData.email !== initialData.email) {
      await dispatch(
        updateUser({
          id: user.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          countryCode: profileData.countryCode,
        })
      ).unwrap();
      setInitialData(profileData);
      Cookies.remove("token");
      navigate("/verify-otp");
    } else {
      dispatch(
        updateUser({
          id: user.id,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          countryCode: profileData.countryCode,
        })
      );
      setInitialData(profileData);
    }
  };

  const changePassword = async () => {
    const res = await dispatch(validateEmail({ email:user.email }));
    if (res.payload) {
      toast.success("Change password link sent to email");
      navigate("/home");
    } else {
      toast.error("Email doesn't exist");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-75px)] bg-gray-50 py-10 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        Profile Page
      </h1>

      {/* Profile Image */}
      {/* <div className="flex items-center justify-center mb-6">
        <div className="rounded-full bg-gray-200 w-32 h-32 flex items-center justify-center">
          <span className="text-5xl text-gray-400">👤</span>
        </div>
      </div> */}

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <TextInput
          label="Name"
          placeholder="Enter name"
          value={profileData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full"
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          value={profileData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full"
          type="email"
          error={emailError}
          disabled={user.type === 1}
        />
        <div className="w-full">
          <label className="block mb-2">Country Code</label>
          <PhoneInput
            defaultCountry="in"
            placeholder="Country Code"
            value={profileData.countryCode}
            onChange={(e) => handleInputChange("countryCode", e)}
            className="w-full"
            inputStyle={{ width: "100%" }}
            inputProps={{ readOnly: true }}
          />
        </div>
        <TextInput
          label="Phone Number"
          placeholder="Enter phone"
          value={profileData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="w-full"
          type="number"
        />
      </div>

      <div className="flex justify-center mt-6 w-full max-w-md">
        <button
          onClick={changePassword}
          className="mt-4 border border-blue-500 text-blue-500 transition py-2 px-4 rounded w-full"
          disabled={!!emailError}
        >
          Change Password
        </button>
      </div>
      <div className="flex justify-center w-full max-w-md">
        <button
          onClick={handleSave}
          className="mt-4 bg-orange-400 transition text-white py-2 px-4 rounded w-full"
          disabled={!!emailError}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
