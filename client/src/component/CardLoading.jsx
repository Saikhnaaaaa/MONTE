import React from "react";

const CardLoading = () => {
  return (
    <div className="border p-2 rounded grid gap-2 max-w-52 animate-pulse">
      <div className="min-h-20 bg-blue-500 rounded"></div>
      <div className="p-3 bg-red-500 rounded w-20"></div>
      <div className="p-3 bg-green-500 rounded"></div>
      <div className="p-3 bg-yellow-500 rounded w-14"></div>

      <div className="flex items-center justify-between gap-3">
        <div className="p-3 bg-black rounded w-20"></div>
        <div className="p-3 bg-orange-500 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CardLoading;
