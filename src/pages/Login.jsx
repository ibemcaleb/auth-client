import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex items-center 
    justify-center min-h-screen px-6 sm:px-0
    bg-linear-to-br from-blue-200 to-purple-400"
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-8 sm:w-16 cursor-pointer"
      />
      <div
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-full 
      sm:w-96 text-indigo-300 text-sm sm:text-base"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account!" : "Login"}
        </h2>
        <p className="text-center mb-6 text-sm">
          {state === "Sign Up"
            ? "Create your account!"
            : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div
              className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full
             bg-[#333A5C]"
            >
              <img src={assets.user} alt="User" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Full name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.email} alt="Email" className="w-6 h-6" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
          <div className="relative mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock} alt="Lock" className="w-6 h-6" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none min-w-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-500 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-500 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
