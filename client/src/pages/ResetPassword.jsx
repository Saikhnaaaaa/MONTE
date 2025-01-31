import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });


  const valideValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handeSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword){
        toast.error("new password and confirm password not match");
        return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
            email: "",
            newPassword: "",
            confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  return (
    <section className=" w-full container mx-auto px-2 flex items-center justify-center  ">
      <div className="bg-white w-full p-7 rounded-md my-8 max-w-lg mx-auto">
        <p className="font-semibold text-lg mb-2 text-center">
          Enter Your New Password
        </p>

        <form className="grid gap-4 py-4  " onSubmit={handeSubmit}>
          {/* new Password  */}

         
           
            <div className="grid gap-1">
              <label htmlFor="password">New Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  className="outline-none w-full"
                  value={data.newPassword}
                  name="newPassword"
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


            {/* confirm password */}

            <div className="grid gap-1">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
                <input
                  type={showConPass ? "text" : "password"}
                  id="confirmPassword"
                  className="outline-none w-full"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                />
                <div
                  className="cursor-pointer "
                  onClick={() => setShowConPass(!showConPass)}
                >
                  {showConPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
          

          <button
            disabled={!valideValue}
            type="submit"
            className={` ${
              valideValue ? "bg-green-700" : "bg-gray-500 hover:bg-green-800"
            }  text-white p-2 rounded-md font-semibold  my-3 w-full `}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            className="font-semibold text-green-700 hover:text-green-800"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
