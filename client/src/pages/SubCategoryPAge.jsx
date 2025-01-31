import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../component/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import DisplayTable from "../component/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../component/ViewImage";
import { CiEdit } from "react-icons/ci";
import { CiEraser } from "react-icons/ci";
import EditSubCategory from "../component/EditSubCategory";
import ConfirmBox from "../component/ConfirmBox";
import toast from "react-hot-toast";

const SubCategoryPAge = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setUrlImage] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubCat, setDeleteSubCat] = useState({
    _id: "",
  });
  const [openDelete, setOpenDelete] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
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
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row", row.original.image);
        return (
          <div className="flex items-center justify-center w-10 h-10 cursor-pointer">
            <img
              src={row.original.image}
              alt=""
              className="w-10 h-10"
              onClick={() => {
                setUrlImage(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "category"}
                  className="shadow-md px-2 py-1 rounded-md inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),

    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => {
                setEditData(row.original);
                setOpenEdit(true);
              }}
              className="py-1 px-2 border bg-green-800 text-white border-green-800 hover:text-green-800  rounded-md hover:bg-white   "
            >
              <CiEdit size={22} />
            </button>
            <button
              onClick={() => {
                setDeleteSubCat(row.original);
                setOpenDelete(true);
              }}
              className="py-1 px-2 border bg-red-800 text-white border-red-800 hover:text-red-800  rounded-md hover:bg-white    "
            >
              <CiEraser size={22} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCat = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCat,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDelete(false);
        setDeleteSubCat({
          _id: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2  shadow-md flex items-center justify-between bg-white rounded-lg">
        <h2 className="text-xl font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-green-800 text-green-800 hover:bg-green-700 hover:text-white px-3 py-1 rounded-sm "
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategory}
          close={() => setOpenAddSubCategory(false)}
        />
      )}

      {imageUrl && <ViewImage url={imageUrl} close={() => setUrlImage("")} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDelete && (
        <ConfirmBox
          cancel={() => setOpenDelete(false)}
          confirm={handleDeleteSubCat}
          close={() => setOpenDelete(false)}
        />
      )}
    </section>
  );
};

export default SubCategoryPAge;
