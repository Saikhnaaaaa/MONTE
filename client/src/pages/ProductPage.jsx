import React, { useEffect } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useState } from "react";
import Axios from "../utils/Axios";
import Loading from "../component/Loading";
import ProductCardAdmin from "../component/ProductCardAdmin";
import { CiSearch } from "react-icons/ci";
import EditProductAdmin from "../component/EditProductAdmin";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [pageData, setPage] = useState(1);
  console.log("pageData", pageData);
  console.log("productDataaa", productData);

  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getAllProduct,
        data: {
          page: pageData,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      console.log("product page", responseData);

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [pageData]);

  const handleNext = () => {
    if (pageData !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };

  const handlePrevious = () => {
    if (pageData > 1) {
      setPage((preve) => preve - 1);
    }
  };

  const handleOnchange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);
    return () => clearTimeout(interval);
  }, [search]);

  return (
    <section>
      <div className="p-2  shadow-md flex items-center justify-between bg-white rounded-lg gap-4">
        <h2 className="text-xl font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full bg-blue-50 px-4 py-2 flex items-center rounded-lg gap-3 border  focus-within:border-primary-200 ml-auto">
          <CiSearch size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full outline-none bg-transparent"
            onChange={handleOnchange}
            value={search}
          />
        </div>
      </div>
      {loading && <Loading />}

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2 ">
            {productData.map((item, index) => {
              return <ProductCardAdmin data={item} key={index + item._id} fetchProductData={fetchProductData}/>;
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-100"
          >
            Previous
          </button>

          <button className="w-full bg-slate-100">
            {pageData}/{totalPageCount}
          </button>

          <button
            onClick={handleNext}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-100"
          >
            Next
          </button>
        </div>
      </div>

      
    </section>
  );
};

export default ProductPage;

// const ProductPage = () => {
//   const [productData, setProductData] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchProductData = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getAllProduct,
//         data: {
//           page: page,
//         },
//       });

//       const { data: responseData } = response;

//       console.log("responseDataaaaa", responseData);

//       if (responseData.success) {
//         setProductData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [page]);

//   return <div>ProductPage</div>;
// };

// export default ProductPage;
