import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalPRovider";
import AddAddress from "../component/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CkeckoutPage = () => {
  const {
    notDisCountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state?.addresses?.addressList);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state?.cartItem?.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.createOrder,
        data: {
          list_items: cartItemList,
          totalAmt: totalPrice,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrder) {
          fetchOrder();
        }

        navigate("/success", {
          state: {
            text: "Order",
            data: responseData.data,
          },
        });
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-4 w-full flex flex-col lg:flex-row gap-4 justify-between">
        <div className="w-full lg:flex-[3]  ">
          {/* Address */}

          <h1 className="text-lg font-semibold mb-4">Choose your Address</h1>

          <div className="bg-white p-4 grid gap-4">
            {addressList?.map((item, index) => {
              return (
                <label
                  htmlFor={"address" + index}
                  className={!item.status && "hidden"}
                >
                  <div
                    className="border rounded p-3 mb-4 flex gap-3 hover:bg-blue-50 cursor-pointer"
                    key={index + item._id}
                  >
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{item.address_line}</p>
                      <p>{item.city}</p>
                      <p>{item.country}</p>
                      <p>{item.state}</p>
                      <p>{item.pincode}</p>
                      <p>{item.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border2 border-dashed flex items-center justify-center cursor-pointer"
            >
              Add Address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md lg:flex-[2] bg-white py-4 px-2">
          {/* Summary */}
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex gap-4 items-center ml-1">
              <p>Item total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {notDisCountTotalPrice}T
                </span>
                <span className="">{totalPrice}T</span>
              </p>
            </div>
            <div className="flex gap-4 items-center ml-1    ">
              <p>Quantity total</p>
              <p className="flex items-center gap-2">
                <span className="">{totalQty} item</span>
              </p>
            </div>
            <div className="flex gap-4 items-center ml-1    ">
              <p>Delivery charge</p>
              <p className="flex items-center gap-2">
                <span className="">Free</span>
              </p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{totalPrice}</p>
            </div>
          </div>

          <div className="w-full bg-white p-4 max-w-sm flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-700 text-white font-semibold hover:text-green-700 hover:bg-white border border-green-700">
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 bg-green-700 text-white font-semibold hover:text-green-700 hover:bg-white border border-green-700"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CkeckoutPage;
