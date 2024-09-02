import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/user/userSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState("");

  const handleNavigation = () => {
    if (token) {
      navigate("/history");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    const getToken = Cookies.get("token");
    setToken(getToken!);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-white px-4 md:px-8 h-[75px] border-b">
      <div
        className="text-black font-bold text-xl md:text-2xl ml-4 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Flights
      </div>
      <div className="flex gap-4">
        <div
          className="flex items-center space-x-4 text-blue mr-4 cursor-pointer"
          onClick={handleNavigation}
        >
          {token ? "History" : "Login/SignUp"}
        </div>
        <div
          className="flex items-center space-x-4 text-blue mr-4 cursor-pointer"
          onClick={handleLogout}
        >
          {token && "Logout"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
