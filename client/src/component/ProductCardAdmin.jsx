import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";

import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProductDetails,
        data: {
          _id: data._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-36 p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-400">{data?.unit}</p>
      <div className="grid grid-cols-2 gap-3 py-2">
        <button
          onClick={() => setEditOpen(true)}
          className="border px-1 py-1 border-greed-600 bg-green-100  text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="border px-1 py-1 border-red-600 bg-red-100 rounded text-sm"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm p-4 rounded-lg ">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-xl font-semibold text-red-800">
                Permanent Delete
              </h1>
              <button>
                <IoClose size={25} onClick={() => setOpenDelete(false)} />
              </button>
            </div>
            <p className="my-4 text-sm text-neutral-600">
              Are you sure you want to delete this item?
            </p>
            <div className="w-fit ml-auto gap-3 flex items-center justify-between">
              <button
                onClick={() => setOpenDelete(false)}
                className="flex-1 bg-red-100 text-red-800 font-medium rounded-md  py-[1px]  border border-red-800 hover:bg-red-700 hover:text-white px-3"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-green-100 text-green-800 font-medium rounded-md mx-2 py-[1px] border  px-3 border-green-800 hover:bg-green-700 hover:text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardAdmin;
