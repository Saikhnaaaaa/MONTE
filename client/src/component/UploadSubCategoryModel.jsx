import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCatData = useSelector((state) => state.product.allCategory);

  console.log("first", allCatData);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadSubCatImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);

    const uploadCatImage = await uploadImage(file);

    const { data: ImageResponse } = uploadCatImage.data;
    setLoading(false);
    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.url,
      };
    });
  };

  const handleRemoveCategory = (categoryId) => {
    const index = data.category.findIndex((cat) => cat._id === categoryId);

    data.category.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: data,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0  p-4 flex items-center justify-center bg-opacity-70 bg-neutral-800  ">
      <div className="bg-green-950 max-w-4xl w-full p-4 rounded ">
        <div className="flex items-center justify-between text-white">
          <h1 className="text-xl font-semibold">Add Sub Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2 " onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="SubCategoryname" className="text-white">
              Name
            </label>
            <input
              type="text"
              id="SubCategoryname"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleChange}
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
                    alt="Subcategory"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-800">No image selected</p>
                )}
              </div>

              <label htmlFor="uploadSubCatImage">
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
                  onChange={handleUploadSubCatImage}
                  type="file"
                  id="uploadSubCatImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-2">
            <label>Select Category</label>
            <div className="border focus-within:border-green-800 rounded-lg p-2">
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {data.category.map((cat, index) => {
                  return (
                    <div className="flex items-center justify-center gap-2 bg-white shadow-lg rounded-md p-2">
                      <p key={cat._id + "cat"} className="">
                        {cat.name}
                      </p>

                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategory(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* select category */}

              <select
                className="w-full p-2 bg-transparent text-white outline-none rounded "
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCatData.find(
                    (el) => el._id === value
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>Select Category</option>
                {allCatData.map((category, index) => {
                  return (
                    <option
                      className="text-black "
                      key={category._id + "SubCategory"}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className={`${
              !data.name && !data.image && !data.category.length
                ? "bg-gray-400 py-2 px-1 rounded-lg mt-8 text-white"
                : "border border-white bg-green-800 text-white  hover:bg-green-700 hover:text-white rounded-lg py-2 px-1 cursor-pointer mt-8"
            }`}
          >
            Submit Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
