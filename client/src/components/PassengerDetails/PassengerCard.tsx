import { Select, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch } from "react-redux";
import { updatePassengerDetails } from "../../redux/passengers/passengerActions";
import DatePickerModal from "../common/DatePickerModal";
import countryList from "react-select-country-list";
import { z } from "zod";

const PassengerCard = ({
  passenger,
  index,
  isInternational,
}: {
  passenger: any;
  index: number;
  isInternational: boolean;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const options = useMemo(() => {
    return countryList().getData().map((country) => ({
      label: country.label,
      value: country.label,
    }));
  }, []);

  // Zod schema for email validation
  const emailSchema = z.string().email("Please enter a valid email address.");

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") {
      const result = emailSchema.safeParse(value);
      if (!result.success) {
        setEmailError(result.error.errors[0].message);
      } else {
        setEmailError(null);
      }
    }

    dispatch(
      updatePassengerDetails(index, {
        ...passenger,
        [field]: value,
      })
    );
  };

  const handleDateChange = (date: any) => {
    handleInputChange("dob", date ? date.format("YYYY-MM-DD") : "");
    setOpen(false);
  };

  const requiredLabel = (label: string) => (
    <>
      {label} <span className="text-red-500">*</span>
    </>
  );

  return (
    <div className="bg-white w-[50%] max-lg:w-[70%] max-md:w-[90%] rounded-md">
      <div className="border-b justify-center flex py-6 items-center text-lg font-semibold">
        Passenger Details
      </div>
      <div className="flex-wrap flex justify-evenly shadow-inner py-6 gap-y-6">
        <TextInput
          label={requiredLabel("Name")}
          placeholder="Enter name"
          value={passenger.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-[45%]"
        />
        <TextInput
          label={requiredLabel("Email")}
          placeholder="Enter email"
          value={passenger.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-[45%]"
          type="email"
          error={emailError}
        />
        <Select
          label={requiredLabel("Gender")}
          placeholder="Select gender"
          value={passenger.gender || ""}
          onChange={(value) => handleInputChange("gender", value!)}
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          className="w-[45%]"
        />
        <TextInput
          label={requiredLabel("Date of Birth")}
          placeholder="Select date of birth"
          value={passenger.dob || ""}
          onClick={() => setOpen(true)}
          className="w-[45%]"
          readOnly
        />
        <div className="w-[45%]">
          {requiredLabel("Country Code")}
          <PhoneInput
            defaultCountry="in"
            placeholder="Country Code"
            value={passenger.countryCode || ""}
            onChange={(e) => handleInputChange("countryCode", e)}
            className="w-full"
            inputStyle={{ width: "100%" }}
            countrySelectorStyleProps={{ buttonStyle: { width: "50px" } }}
            inputProps={{
              readOnly: true,
            }}
          />
        </div>
        <TextInput
              label={requiredLabel("Phone Number")}
              placeholder="Enter phone"
              value={passenger.phoneNumber || ""}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-[45%]"
              type="number"
            />
        {isInternational && (
          <>
            <TextInput
              label={requiredLabel("Passport No")}
              placeholder="Enter passport no"
              value={passenger.passportNo || ""}
              onChange={(e) => handleInputChange("passportNo", e.target.value)}
              className="w-[45%]"
            />
            <Select
              label={requiredLabel("Passport Country")}
              placeholder="Enter passport countrygender"
              value={passenger.passportCountry || ""}
              onChange={(value) => handleInputChange("passportCountry", value!)}
              data={options}
              className="w-[45%]"
            />
            <TextInput
              label={requiredLabel("Passport Expiry")}
              placeholder="Enter passport expiry"
              value={passenger.passportExpiry || ""}
              onChange={(e) => handleInputChange("passportExpiry", e.target.value)}
              className="w-[45%]"
            />
          </>
        )}
      </div>
      <DatePickerModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedDate={passenger.dob ? dayjs(passenger.dob) : null}
        handleDateChange={handleDateChange}
        title="Select Date of Birth"
        maxDate={dayjs(new Date())}
      />
    </div>
  );
};

export default PassengerCard;
