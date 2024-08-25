import { TextInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateUser } from "../../redux/user/userAction";

const DetailsCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [phone, setPhone] = useState<string>(user.phone || "");

  useEffect(() => {
    if (user.phone) {
      setPhone(user.phone);
    }
  }, [user.phone]);

  const handleSave = () => {
    dispatch(
      updateUser({
        id: user.id,
        phone: phone,
      })
    );
  };

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
        <TextInput
          label={requiredLabel("Phone")}
          value={phone}
          className="w-[45%]"
          disabled={user.phone ? true : false}
          onChange={(event) => setPhone(event.currentTarget.value)}
        />
      </div>
      {!user.phone && (
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={handleSave}
            className="w-[100px] font-semibold cursor-pointer text-gray-100 flex justify-center items-center gap-1 border p-3 bg-orange-400 rounded-xl"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
