import { UserCircleIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/user/userSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleNavigation = () => {
    if (token) {
      navigate("/history");
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsProfileOpen(false);
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        Airwave
      </div>
      <div className="flex gap-4 items-center">
        <div
          className="flex items-center space-x-4 text-blue mr-4 cursor-pointer"
          onClick={handleNavigation}
        >
          {token ? "History" : "Login/SignUp"}
        </div>

        {token && (
          <div className="relative" ref={profileRef}>
            <UserCircleIcon
              className="h-6 w-6 hover:text-gray-600 cursor-pointer"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
                <ul className="">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate("/profile");
                      setIsProfileOpen(false);
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
