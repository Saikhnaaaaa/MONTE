import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div className="m-2 w-full max-w-md bg-green-800 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center text-center">
      <p className="text-white font-bold ">
        {Boolean(location.state.text) ? location.state.text : "Payment"}{" "}
        Successfully
      </p>
      <Link
        to="/"
        className="border px-4 py-1 mt-2 rounded bg-white text-green-800 border-white hover:bg-green-800 hover:text-white"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
