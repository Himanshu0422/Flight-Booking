import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { changePassword } from "../redux/user/userAction";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError(null);
      const res = await dispatch(changePassword({
        email,
        password: newPassword
      })).unwrap();
      console.log(res);
      if(res){
        toast.success("Password successfully changed.");
        navigate("/home");
      }else {
        toast.error('Not able to change password')
      }
    }
  };

  useEffect(() => {
    if (!email) {
      toast.error("Change password from profile page.");
      navigate("/home");
    }
  }, [email, navigate]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white items-center justify-center p-8">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-6 w-[90%] sm:w-[65%] md:w-[80%] lg:w-[60%]">
            <h2 className="text-3xl font-semibold text-gray-900 text-center max-xs:text-2xl">
              Set New Password
            </h2>
          </div>

          <form
            className="w-[90%] sm:w-[65%] md:w-[80%] lg:w-[60%]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Confirm new password"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-[#162D3A] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
              >
                Submit
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

export default ChangePassword;
