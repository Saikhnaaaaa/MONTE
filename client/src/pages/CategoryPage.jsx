import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../component/UploadCategoryModel";
import Loading from "../component/Loading";
import NoData from "../component/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import EditCategory from "../component/EditCategory";
import ConfirmBox from "../component/ConfirmBox";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [opneUploadCat, setOpenCat] = useState(false);

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  useEffect(() => {
    setCategoryData(allCategory);
  }, []);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        // toast.success(responseData.message);
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2  shadow-md flex items-center justify-between bg-white rounded-lg">
        <h2 className="text-xl font-semibold">Category</h2>
        <button
          onClick={() => setOpenCat(true)}
          className="text-sm border border-green-800 text-green-800 hover:bg-green-700 hover:text-white px-3 py-1 rounded-sm "
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-2 lg:p-4 grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-4 bg-white h-[680px] lg:h-[680px] overflow-hidden ">
        {categoryData.map((item, index) => {
          return (
            <div
              key={index}
              className="w-56 h-56 flex flex-col items-center justify-center group"
            >
              <div className="w-40 h-56 rounded-md  object-scale-down overflow-hidden shadow-md bg-white flex flex-col items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-scale-down"
                />
                <p>{item.name}</p>
                <div className="items-center justify-between w-full flex gap-2">
                  <button
                    onClick={() => {
                      setOpenEdit(true), setEditData(item);
                    }}
                    className="flex-1 bg-green-100 text-green-800 font-medium rounded-md mx-2 py-[1px] border border-green-800 hover:bg-green-700 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpenConfirmBox(true);
                      setDeleteCategory(item);
                    }}
                    className="flex-1 bg-red-100 text-red-800 font-medium rounded-md  py-[1px]  border border-red-800 hover:bg-red-700 hover:text-white "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {opneUploadCat && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenCat(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          confirm={handleDeleteCategory}
          cancel={() => setOpenConfirmBox(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
