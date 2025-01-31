import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { LuExternalLink } from "react-icons/lu";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm my-2 flex gap-2 items-center justify-between">
        <span className="font-semibold max-w-52 text-ellipsis line-clamp-1 ">
          {user.name || user.mobile}{" "}
          <span className="text-xs font-normal text-green-800">{user.role === "ADMIN" ? "   (Admin)" : ""}</span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <LuExternalLink size={16} />
        </Link>
      </div>
      <Divider />

      <div className="text-sm my-2 grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-slate-200 py-1 "
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 hover:bg-slate-200 py-1 "
          >
            Sub category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-slate-200 py-1 "
          >
            Upload product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 hover:bg-slate-200 py-1 "
          >
            Product
          </Link>
        )}
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-slate-200 py-1 "
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-slate-200 py-1 "
        >
          Save Address
        </Link>
        <button
          onClick={handleLogOut}
          className="text-left text-sm my-2 px-2 hover:bg-slate-200 py-1 "
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
