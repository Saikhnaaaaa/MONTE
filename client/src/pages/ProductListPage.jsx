import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../component/Loading";
import CardProduct from "../component/CardProduct";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const subCategoryLenght = params.subCategory.split("-");
  const subCategoryName = subCategoryLenght
    ?.slice(0, subCategoryLenght.length - 1)
    .join("-");

  const AllSubCategory = useSelector((state) => state.product.allSubCategory);

  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);
  console.log(DisplaySubCategory, "DisplaySubCategory")

  const categoryId = params.category.split("-").slice(-1);
  const subCategoryId = params.subCategory.split("-").slice(-1);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = AllSubCategory.filter((sub) => {
      const filterData = sub.category.some((el) => {
        return el._id == categoryId;
      });

      return filterData ? filterData : false;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);

  return (
    <section className="sticky top-[24px] z-10 lg:top-20">
      <div className="container sticky top-[24px] mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[270px,1fr] gap-4 ">
        {/*  sub category */}
        <div className=" min-h-[80vh] grid gap-1 shadow-md max-h-[80v] overflow-y-scroll scrollbarCustom">
          {DisplaySubCategory?.map((sub, index) => {
            

            const url = `/${validURLConvert(sub.category[0]?.name)}-${sub?.category[0]?._id}/${validURLConvert(
              sub?.name
            )}-${sub?._id}`;

            return (
              <Link to={url}
                key={index + sub._id}
                className={`w-full h-32 p-2 lg:flex items-center justify-between cursor-pointer  border-b hover:bg-red-600 lg:gap-4 
                
                ${subCategoryId === sub._id ? "bg-green-400 " : ""}
                
                
                `}
              >
                <div className="w-fit mx-auto ">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-14 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-1 lg:mt-0 text-sm lg:text-left lg:text-lg text-center">
                  {sub.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* product */}

        <div className="">
          <div className="bg-white shadow-md p-2">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="grid grid-cols-2 p-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {data?.map((p, index) => {
                return <CardProduct key={index + p._id} data={p} />;
              })}
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
