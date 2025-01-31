import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../component/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../component/EditAddressDetails";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useGlobalContext } from "../provider/GlobalPRovider";
import toast from "react-hot-toast";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: id,
        },
      });

      if (response.data.success) {
        toast.success("address removed");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md px-2 py-2 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border border-green-800 text-green-800 hover:bg-green-700 hover:text-white px-3 py-1 rounded "
        >
          Add address
        </button>
      </div>
      <div className="bg-white shadow-md p-4 grid gap-4">
        {addressList?.map((item, index) => {
          return (
            <div
              className={`border rounded w-full p-3 mb-4 flex gap-3 hover:bg-blue-50 cursor-pointer ${
                !item.status && "hidden"
              }`}
              key={index + item._id}
            >
              <div className="w-full">
                <p>{item.address_line}</p>
                <p>{item.city}</p>
                <p>{item.country}</p>
                <p>{item.state}</p>
                <p>{item.pincode}</p>
                <p>{item.mobile}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setOpenEdit(true), setEditData(item);
                  }}
                  className="px-2 cursor-pointer hover:text-green-800"
                >
                  <MdEdit size={25} />
                </button>
                <button
                  onClick={() => handleDisableAddress(item._id)}
                  className="px-2 cursor-pointer hover:text-red-800"
                >
                  <MdDelete size={25} />
                </button>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 bg-blue-50 border2 border-dashed flex items-center justify-center cursor-pointer"
        >
          Add Address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {openEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
    </div>
  );
};

export default Address;
