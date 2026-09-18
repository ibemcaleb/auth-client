import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

axios.defaults.withCredentials = true;
export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState("");

  // axios.defaults.withCredentials = true;
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : console.log(data.message); //toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    function getAuthenticated() {
      getAuthState();
    }
    getAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
