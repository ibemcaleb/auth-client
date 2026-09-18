// import React from "react";
import { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-8 sm:w-16" />
      {userData ? (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-200 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-300 cursoe-pointer"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-300 cursoe-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border 
       border-gray-500 rounded-full text-sm 
       sm:text-lg px-4 py-1 sm:px-6 sm:py-2 text-gray-800 
       hover:bg-gray-100 transition-all 
       hover:text-gray-500 cursor-pointer"
        >
          Login
          <img src={assets.arrow} alt="Arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
