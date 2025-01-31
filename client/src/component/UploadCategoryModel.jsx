import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  console.log("data ", data);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCatImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true)

    const uploadCatImage = await uploadImage(file);

    const { data: ImageResponse } = uploadCatImage.data;
    setLoading(false)
    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.url,
      };
    });
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0  p-4 flex items-center justify-center ">
      <div className="bg-green-950 max-w-4xl w-full p-4 rounded ">
        <div className="flex items-center justify-between text-white">
          <h1>Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2 " onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="Categoryname" className="text-white">
              Name
            </label>
            <input
              type="text"
              id="Categoryname"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnchange}
              className="bg-blue-50 outline-none border focus-within:border-green-800  rounded-lg p-2"
            />
          </div>

          <div className="grid gap-1">
            <p className="text-white">Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center justify-between">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded-lg ">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-800">No image selected</p>
                )}
              </div>

              <label htmlFor="uploadCatImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-400 py-2 px-1 rounded-lg text-white"
                      : " border border-white bg-green-800 text-white  hover:bg-green-700 hover:text-white rounded-lg py-2 px-1 cursor-pointer"
                  }`}
                >
                  {loading ? "Loading..." : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCatImage}
                  type="file"
                  id="uploadCatImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`${
              !data.name && !data.image
                ? "bg-gray-400 py-2 px-1 rounded-lg mt-8 text-white"
                : "border border-white bg-green-800 text-white  hover:bg-green-700 hover:text-white rounded-lg py-2 px-1 cursor-pointer mt-8"
            }`}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
