import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
   
    email: "",
    password: "",
    
  });

  const [showPass, setShowPass] = useState(false);
 
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handeSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if(response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if(response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))


        setData({
          
          email: "",
          password: "",
          
        })
        navigate("/")
      }

      console.log("response ", response)
    } catch (error) {
      AxiosToastError(error);
    }

    

 
  };

  return (
    <section className=" w-full container mx-auto px-2 flex items-center justify-center  ">
      <div className="bg-white w-full p-7 rounded-md my-8 max-w-lg mx-auto">
    

        <form className="grid gap-4 py-4  " onSubmit={handeSubmit}>
          
          {/* email  */}

          <div className="grid gap-1">
            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* password  */}

          <div className="grid gap-1">
            <label htmlFor="password"> Password: </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                className="outline-none w-full"
                value={data.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                className="cursor-pointer "
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <Link to={"/forgot-password"} className="block ml-auto font-semibold text-green-700 hover:text-green-800">Forgot Password?</Link>

        
          <button
            disabled={!valideValue}
            type="submit"
            className={` ${
              valideValue ? "bg-green-700" : "bg-gray-500 hover:bg-green-800"
            }  text-white p-2 rounded-md font-semibold  my-3 w-full `}
          >
            Login
          </button>
        </form>


        <p>Dont't have an account? <Link className="font-semibold text-green-700 hover:text-green-800" to="/register">Register</Link></p>
      </div>
    </section>
  );
};

export default Login;
