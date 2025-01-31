import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const loadingCardNumber = new Array(6).fill(null);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
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
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductList = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id === id;
      });

      return filterData ? true : null;
    });

    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    return url;
  };

  const redirectUrl = handleRedirectProductList();

  return (
    <div>
      <div className="container mx-auto p-4 flex justify-between items-center gap-4 bg-blue-500">
        <h3 className="text-xl font-semibold ">{name}</h3>
        <Link to={redirectUrl} className="text-green-700 hover:text-green-800">
          See All
        </Link>
      </div>
      <div
        className="flex items-center gap-2 md:gap-6 lg:gap-8 justify-between container mx-auto px-1 overflow-x-scroll scroll-smooth scrollbar-hide"
        ref={containerRef}
      >
        {loading &&
          loadingCardNumber.map((el, index) => {
            return <CardLoading key={index + el} />;
          })}

        {data?.map((p, index) => {
          return <CardProduct key={index + p._id} data={p} />;
        })}

        <div className="left-[-90px] right-[-90px] container mx-auto  absolute  hidden lg:flex items-center justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative hover:bg-white shadow-lg p-1 rounded-full text-lg hover:border-2 "
          >
            <CiCircleChevLeft size={35} />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative hover:bg-white shadow-lg p-1 rounded-full text-lg hover:border-2"
          >
            <CiCircleChevRight size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
