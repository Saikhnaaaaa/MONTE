import React from "react";
import { useGlobalContext } from "../provider/GlobalPRovider";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartList = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state?.cartItem.cart);

  return (
    <>
      cartItem[0] && (
      <div className=" p-2 sticky bottom-4  ">
        <div className="bg-green-800 px-2 py-1 flex items-center justify-between  rounded text-neutral-200 text-sm gap-3 lg:hidden ">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500 rounded w-fit">
              <FaCartShopping size={25} />
            </div>

            <div className="text-xs">
              <p>{totalQty} items</p>
              <p>{totalPrice}</p>
            </div>
          </div>

          <Link to={"/cart"} className="flex items-center gap-1">
            <span className="text-xs">View Cart</span>
          </Link>
        </div>
      </div>
      )
    </>
  );
};

export default CartList;
