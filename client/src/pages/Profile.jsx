import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../component/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(userData);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* profile upload display image  */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>

      <button
        onClick={() => setOpenProfileEdit(true)}
        className="text-xs min-w-20 border border-green-800 text-green-800 hover:bg-green-700 hover:text-white px-3 py-1 rounded-full mt-3 "
      >
        Edit Profile
      </button>

      {openProfileEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileEdit(false)} />
      )}

      {/* name mobile email change password  */}

      <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
        {/* Name  */}
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-800 rounded-lg"
            value={userData.name}
            onChange={handleOnChange}
            name="name"
            required
          />
        </div>
        {/* Email  */}
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-800 rounded-lg"
            value={userData.email}
            onChange={handleOnChange}
            name="email"
            required
          />
        </div>

        {/* Mobile  */}
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-green-800 rounded-lg"
            value={userData.mobile}
            onChange={handleOnChange}
            name="mobile"
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold border-green-800 text-green-800 hover:bg-green-700 hover:text-white rounded-lg">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
