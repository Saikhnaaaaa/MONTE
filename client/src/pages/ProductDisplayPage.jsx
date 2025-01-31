import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import Divider from "../component/Divider";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../component/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  console.log(data, "data");

  const imageContainer = useRef();

  const handleSrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleSrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      <div className="">
        <div className="bg-white lg:bg-red-500 lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 w-full h-full">
          <img
            src={data.image[image]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data?.image?.map((item, index) => {
            return (
              <div
                className={`bg-slate-400 w-3 h-3 lg:h-5 lg:w-5 rounded-full cursor-pointer ${
                  index + 1 === image + 1 && "bg-slate-500"
                }`}
                key={item + index}
                onClick={() => setImage(index)}
              ></div>
            );
          })}
        </div>
        <div className="grid relative ">
          <div
            ref={imageContainer}
            className="flex z-20 relative gap-4 w-full overflow-x-auto scrollbar-hide"
          >
            {data?.image?.map((item, index) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 shadow-md cursor-pointer "
                  key={item + index}
                >
                  <img
                    src={item}
                    alt="min-image"
                    className="object-scale-down w-full h-full"
                    onClick={() => setImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full  mt-6 flex justify-between absolute items-center">
            <button
              onClick={handleSrollLeft}
              className="bg-white -ml-7 z-20 relative p-1 rounded-full shadow-lg"
            >
              <VscTriangleLeft />
            </button>
            <button
              onClick={handleSrollRight}
              className="bg-white -mr-7 z-20 relative p-1 rounded-full shadow-lg"
            >
              <VscTriangleRight />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="lg:text-2xl font-bold text-lg">{data?.name}</h2>
        <p className="bg-green-300 w-fit py-1 px-2 rounded">{data?.unit}</p>
        <Divider />
        <div className="flex items-center gap-2 lg:gap-4">
          <p className="text-lg">Price</p>
          <p className="font-semibold text-lg  bg-green-100 py-1 px-2 rounded border border-green-300 ">
            {priceWithDiscount(data?.price, data?.discount)}T
          </p>
          {data?.discount && <p className="line-through">{data?.price}</p>}
          {data?.discount && (
            <p className="font-bold text-green-600 ">
              {data?.discount}%{" "}
              <span className="text-base text-gray-500">off</span>
            </p>
          )}
        </div>

        {data?.stock === 0 ? (
          <p className="text-lg text-red-500 my-2 ">Out of stock</p>
        ) : (
          <div className="my-4 px-4 ">
            <AddToCartButton data={data} />
          </div>
        )}

        {/* <button className="my-4 px-4 py-1 bg-green-700 text-white rounded hover:bg-green-800 ">
          Add to cart
        </button> */}
      </div>
      <div className="my-4 grid gap-3">
        <div>
          <p className="font-semibold">Description</p>
          <p className="text-base ">{data?.description}</p>
        </div>
        <div>
          <p className="font-semibold">Unit</p>
          <p className="text-base ">{data?.unit}</p>
        </div>
        {data?.more_details &&
          Object.keys(data?.more_details).map((item, index) => {
            return (
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-base ">{data?.more_details[item]}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ProductDisplayPage;
