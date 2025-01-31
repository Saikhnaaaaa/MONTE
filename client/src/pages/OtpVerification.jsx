import React, { useEffect, useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();


  useEffect(() => {
    if(!location?.state?.email){
        navigate("/forgot-password");
    }
  }, []);



  const valideValue = data.every((el) => el);

  const handeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verify,
        data: {
            otp: data.join(""),
            email: location?.state?.email
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
            state: {
                data : response.data,
                email: location?.state?.email,
                
            }
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2 flex items-center justify-center  ">
      <div className="bg-white w-full p-7 rounded-md my-8 max-w-lg mx-auto">
        <p className="font-semibold text-lg mb-2 text-center">Enter Code</p>

        <form className="grid gap-4 py-4  " onSubmit={handeSubmit}>
          {/* email  */}

          <div className="grid gap-1">
            <label htmlFor="otp"> Enter Your Code: </label>
            <div className="flex gap-2 justify-between mt-3">
              {data.map((item, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref)=>{
                        inputRef.current[index] = ref;
                        return ref
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if(value && index < 5){
                        inputRef.current[index+1].focus()
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            type="submit"
            className={` ${
              valideValue ? "bg-green-700" : "bg-gray-500 hover:bg-green-800"
            }  text-white p-2 rounded-md font-semibold  my-3 w-full `}
          >
            Verify Code
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

export default OtpVerification;
