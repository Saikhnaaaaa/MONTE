import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import uploadImage from "../utils/UploadImage";
import Loading from "../component/Loading";
import ViewImage from "../component/ViewImage";
import { CiEraser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../component/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProductPage = () => {
  const [uploadProductData, setUploadProductData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCat, setSelectCat] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOPenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUploadProductData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);

    const uploadCatImage = await uploadImage(file);

    const { data: ImageResponse } = uploadCatImage.data;
    setLoading(false);
    setUploadProductData((preve) => {
      return {
        ...preve,
        image: [...preve.image, ImageResponse.url],
      };
    });
  };

  const hadnleDeleteImage = async (index) => {
    uploadProductData.image.splice(index, 1);
    setUploadProductData((preve) => {
      return {
        ...preve,
        image: [...preve.image],
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    uploadProductData.category.splice(index, 1);
    setUploadProductData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    uploadProductData.subCategory.splice(index, 1);
    setUploadProductData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = () => {
    setUploadProductData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOPenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", uploadProductData);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: uploadProductData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setUploadProductData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2  shadow-md flex items-center justify-between bg-white rounded-lg">
        <h2 className="text-xl font-semibold">Upload Product</h2>
      </div>

      <div className="grid gap-2 p-8 bg-blue-300 rounded-lg ">
        <form className="grid gap-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={uploadProductData.name}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
              placeholder="Name"
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={uploadProductData.description}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200 resize-none"
              required
              multiple
              rows={3}
              placeholder="Description"
            />
          </div>

          {/* Image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="image"
                className="bg-blue-50 h-32 flex items-center justify-center rounded-md border cursor-pointer hover:border-primary-200 hover:text-primary-200 transition-all duration-300"
              >
                <div className="text-center flex items-center justify-center flex-col">
                  {loading ? <Loading /> : <CiCamera size={35} />}
                  {loading ? "Loading..." : "Upload Image"}
                </div>

                <input
                  type="file"
                  className="hidden"
                  id="image"
                  name="image"
                  onChange={handleUploadImage}
                  accept="image/*"
                />
              </label>

              {/* Uploaded Images */}
              <div className="my-2 flex flex-wrap gap-4 ">
                {uploadProductData.image.length > 0 &&
                  uploadProductData.image.map((image, index) => {
                    return (
                      <div
                        key={image + index}
                        className="h-20 w-20 min-w-20 bg-blue-50 border flex items-center justify-between rounded-md overflow-hidden relative group"
                      >
                        <img
                          src={image}
                          alt={image}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setViewImage(image)}
                        />
                        <div
                          onClick={() => hadnleDeleteImage(index)}
                          className="absolute top-0 right-0 p-1 bg-red-600 border border-red-800 text-white rounded-full cursor-pointer hover:bg-white hover:text-red-600 transition-all duration-300 hidden group-hover:block m-1"
                        >
                          <CiEraser size={15} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Categroy */}
          <div>
            <label htmlFor="category">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 outline-none rounded-md focus-within:border-primary-200"
                value={selectCat}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find(
                    (category) => category?._id === value
                  );

                  console.log("categoryyyy", category);
                  setUploadProductData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectCat("");
                }}
                name="category"
                id="category"
              >
                <option value={""}>Select category</option>

                {allCategory.map((category, index) => {
                  return (
                    <option
                      key={category?._id + "category" + index + "option"}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-3 mt-2">
                {uploadProductData.category.length > 0 &&
                  uploadProductData.category.map((category, index) => {
                    return (
                      <div
                        className="text-sm items-center gap-2 py-1 px-2 flex bg-white rounded-md mt-2 justify-between"
                        key={category?._id + index + "div"}
                      >
                        {category?.name}
                        <div
                          className="hover:text-red-600 cursor-pointer"
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <IoClose size={16} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sub Categroy */}
          <div>
            <label htmlFor="subCategory">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 outline-none rounded-md focus-within:border-primary-200"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (category) => category?._id === value
                  );

                  setUploadProductData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
                name="subCategory"
                id="subCategory"
              >
                <option value={""}>Select sub category</option>

                {allSubCategory.map((category, index) => {
                  return (
                    <option
                      key={category?._id + "category" + index + "option"}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-3 mt-2">
                {uploadProductData.subCategory.length > 0 &&
                  uploadProductData.subCategory.map((category, index) => {
                    return (
                      <div
                        className="text-sm items-center gap-2 py-1 px-2 flex bg-white rounded-md mt-2 justify-between"
                        key={category?._id + index + "div"}
                      >
                        {category?.name}
                        <div
                          className="hover:text-red-600 cursor-pointer"
                          onClick={() => handleRemoveSubCategory(index)}
                        >
                          <IoClose size={16} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Unit */}
          <div className="grid gap-2">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={uploadProductData.unit}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
              placeholder="Unit"
              required
            />
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <label htmlFor="stock">Number of Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={uploadProductData.stock}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
              placeholder="Stock"
              required
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={uploadProductData.price}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
              placeholder="Price"
              required
            />
          </div>

          {/* Discount */}
          <div className="grid gap-2">
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={uploadProductData.discount}
              onChange={handleChange}
              className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
              placeholder="Discount"
              required
            />
          </div>

          {/* More field button */}

          {Object?.keys(uploadProductData?.more_details)?.map((key, index) => {
            return (
              <div key={key + index} className="grid gap-2">
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  id={key}
                  value={uploadProductData?.more_details[key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUploadProductData((preve) => {
                      return {
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [key]: value,
                        },
                      };
                    });
                  }}
                  className="bg-blue-50 p-2 outline-none rounded-md border focus-within:border-primary-200"
                />
              </div>
            );
          })}

          <div
            onClick={() => setOPenAddField(true)}
            className="inline-block bg-primary-200 hover:bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:border-black cursor-pointer rounded-md transition-all duration-300"
          >
            Add fields
          </div>

          <button className="bg-green-700 py-2 rounded text-white hover:bg-white font-medium hover:text-green-700 transition-all duration-300 hover:border-green-700 hover:border">
            Submit
          </button>
        </form>
      </div>

      {viewImage && (
        <ViewImage url={viewImage} close={() => setViewImage("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOPenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProductPage;
