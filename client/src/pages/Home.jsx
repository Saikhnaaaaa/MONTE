import React from "react";
import banner from "../assets/montemebel.jpg";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../component/CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductList = (id, cat) => {
    console.log("id,cat", id, cat);
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id === id;
      });

      return filterData ? true : null;
    });

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    navigate(url);
  };

  return (
    <section>
      <div className=" container mx-auto   my-4 px-4">
        {/* banner daraaa ni hemjeeg ni zasah */}
        <div
          className={`w-full h-80 min-h-48 bg-red-500 my-2 flex justify-center items-center rounded ${
            !banner && animate - pulse
          } `}
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-full hidden lg:block "
          />
          <img src={banner} alt="banner" className="w-full h-full lg:hidden" />
        </div>

        {/* Shop by category */}
        <div className="container w-full mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {loadingCategory
            ? new Array(10).fill(null).map((item, index) => {
                return (
                  <div
                    className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                    key={index + item}
                  >
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                );
              })
            : categoryData.map((item, index) => {
                return (
                  <div
                    key={index + item}
                    className="w-full h-full p-2 rounded cursor-pointer"
                    onClick={() =>
                      handleRedirectProductList(item._id, item.name)
                    }
                  >
                    <div>
                      <img
                        src={item.image}
                        alt="image"
                        className="w-11 h-16 lg:w-32 lg:h-36 object-cover rounded"
                      />
                      <h3 className="w-full h-8 rounded p-1 text-center">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* display category product */}

        {categoryData.map((item, index) => {
          return (
            <CategoryWiseProductDisplay
              id={item._id}
              key={index + item}
              name={item.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
