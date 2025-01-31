import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalPRovider";

const EditAddressDetails = ({ close, data }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,

      pincode: data.pincode,
      country: data.country,
      mobile: data.mobile,
    },
  });
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: {
          ...data,

          address_line: data.address_line,
          city: data.city,
          state: data.state,

          pincode: data.pincode,
          country: data.country,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-70 z-50 flex items-center justify-center overflow-auto ">
      <div className="p-2 w-full max-w-sm">
        <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-xl mb-4">Edit address</h2>
            <p>
              <IoClose size={25} onClick={close} />
            </p>
          </div>
          <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <label htmlFor="name">Address Line:</label>
              <input
                type="text"
                id="name"
                className="bg-blue-50 border rounded"
                {...register("address_line", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                className="bg-blue-50 border rounded"
                {...register("city", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                className="bg-blue-50 border rounded"
                {...register("state", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="number">Mobile number:</label>
              <input
                type="number"
                id="number"
                className="bg-blue-50 border rounded"
                {...register("mobile", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                className="bg-blue-50 border rounded"
                {...register("pincode", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                className="bg-blue-50 border rounded"
                {...register("country", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold hover:text-green-700 mt-4 hover:bg-white border border-green-700 w-full py-2 "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditAddressDetails;
