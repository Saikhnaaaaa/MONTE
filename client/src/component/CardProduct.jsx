import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validURLConvert } from "../utils/validURLConvert";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalPRovider";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);




  return (
    <Link to={url} className="max-h-52 min-h-60 rounded w-40 p-2 bg-red-500 ">
      <div className="min-h-16 max-h-46 w-full  rounded">
        <img
          className="w-full h-full object-scale-down "
          src={data.image[0]}
          alt={data.name}
        />
      </div>
      <div className="text-sm  text-center text-green-700 ">10 min</div>
      <div className=" text-center text-lg font-semibold">{data.name}</div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="text-center font-medium ">{data.unit}ш</div>
        <div className="rounded ">{data.price}Т</div>
        {Boolean(data?.discount) && (
          <p>
            {data?.discount}%{" "}
            <span className="text-base text-gray-500">off</span>
          </p>
        )}
      </div>
      <div className="">
        {data?.stock == 0 ? (
          <p className="text-red-500 text-sm text-center">Out of stock</p>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
