import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalPRovider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItemDetails, setCartItemDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // checking this item is in cart or not

  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data?._id
    );
    const product = cartItem.find((item) => item.productId._id === data?._id);
    if (product) {
      setQty(product.quantity);
    }
    setCartItemDetails(product);
    setIsAvailableCart(checkingItem);
  }, [data, cartItem]);

  const increaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (response.success) {
      toast.success("Item added");
     
    }
  };
  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
      return;
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (response.success) {
        toast.success("Item removed");
       
      }
    }
  };

  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex w-full h-full gap-2">
          <button
            className="bg-green-600 flex-1 flex items-center justify-center hover:bg-green-700 text-white p-1 rounded-full w-full"
            onClick={decreaseQty}
          >
            <FaMinus />
          </button>
          <p className="flex-1 text-center w-full">{qty}</p>
          <button
            className="bg-green-600 w-full flex-1 flex items-center justify-center hover:bg-green-700 text-white p-1 rounded-full"
            onClick={increaseQty}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-800 w-full text-white rounded py-1 px-2 hover:bg-white hover:text-green-800 hover:border hover:border-green-800"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
