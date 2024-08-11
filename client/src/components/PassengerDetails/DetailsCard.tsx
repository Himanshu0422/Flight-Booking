import { TextInput } from "@mantine/core";
import React from "react";

const DetailsCard = () => {

  const requiredLabel = (label: string) => (
    <>
      {label} <span className="text-red-500">*</span>
    </>
  );

  return (
    <div className="bg-white w-[50%] max-lg:w-[70%] max-md:w-[90%] rounded-md">
      <div className="border-b justify-center py-6 flex items-center text-lg font-semibold">
        User Details
      </div>
      <div className="flex-wrap flex justify-evenly items-center py-6 gap-y-6 shadow-inner">
        <TextInput
          label={requiredLabel("Firstname")}
          value={"Himanshu"}
          className="w-[45%]"
          disabled
        />
        <TextInput
          label={requiredLabel("Lastname")}
          value={"Mittal"}
          className="w-[45%]"
          disabled
        />
        <TextInput
          label={requiredLabel("Email")}
          value={"himanshu@gmail.com"}
          className="w-[45%]"
          disabled
        />
        <TextInput
          label={requiredLabel("Phone")}
          value={"273309218"}
          className="w-[45%]"
          disabled
        />
      </div>
    </div>
  );
};

export default DetailsCard;
