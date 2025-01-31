import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-red-800 w-full max-w-md p-4 py-5 rounded mx-auto flex flex-col justify-center items-center text-center">
      <p className="text-white font-bold text-center">Order Cancelled</p>
      <Link
        to="/"
        className="border px-4 py-1 mt-2 rounded bg-white text-red-800 border-white hover:bg-red-800 hover:text-white"
      >
        Go to home
      </Link>
    </div>
  );
};

export default Cancel;
