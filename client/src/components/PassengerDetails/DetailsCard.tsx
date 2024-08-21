import { TextInput } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const DetailsCard = () => {

  const requiredLabel = (label: string) => (
    <>
      {label} <span className="text-red-500">*</span>
    </>
  );

  const user = useSelector((state:RootState) => state.user);

  return (
    <div className="bg-white w-[50%] max-lg:w-[70%] max-md:w-[90%] rounded-md">
      <div className="border-b justify-center py-6 flex items-center text-lg font-semibold">
        User Details
      </div>
      <div className="flex-wrap flex justify-evenly items-center py-6 gap-y-6 shadow-inner">
        <TextInput
          label={requiredLabel("Name")}
          value={user.name}
          className="w-[45%]"
          disabled
        />
        <TextInput
          label={requiredLabel("Email")}
          value={user.email}
          className="w-[45%]"
          disabled={user.email ? true : false}
        />
        {user.phone && <TextInput
          label={requiredLabel("Phone")}
          value={user.phone}
          className="w-[45%]"
          disabled={user.phone ? true : false}
        />}
      </div>
    </div>
  );
};

export default DetailsCard;
