import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalPRovider";
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { priceWithDiscount } from "../utils/PriceWithDiscount";

const OpenCart = ({ close }) => {
  const { notDisCountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state?.cartItem.cart);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const redirectToCheckOutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      close();
      return;
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="fixed bg-neutral-800 top-0 bottom-0 left-0 right-0 z-50 bg-opacity-70 ">
      <div className="bg-white w-full max-w-sm max-h-screen min-h-screen ml-auto">
        <div className="flex items-center p-4 shadow gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>

          <Link to={"/"} className="lg:hidden md:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block md:block">
            <IoClose size={25} />
          </button>
        </div>

        {/* display Items */}
        <div className="max-h-[calc(100vh-120px)] min-h-[75vh] h-full lg:min-h-[80vh] bg-blue-50 p-2 flex flex-col gap-4">
          {cartItem[0] ? (
            <div>
              <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-full justify-between">
                <p>Your total savings</p>
                <p>
                  {notDisCountTotalPrice}-{totalPrice}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-4 overflow-auto ">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={index + item._id}
                        className="flex items-center gap-4 w-full"
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down "
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2 ">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400 ">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold text-neutral-500">
                            {priceWithDiscount(
                              item?.productId?.price,
                              item?.productId?.discount
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>
                <div className="flex gap-4 items-center ml-1">
                  <p>Item total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {notDisCountTotalPrice}T
                    </span>
                    <span className="">{totalPrice}T</span>
                  </p>
                </div>
                <div className="flex gap-4 items-center ml-1    ">
                  <p>Quantity total</p>
                  <p className="flex items-center gap-2">
                    <span className="">{totalQty} item</span>
                  </p>
                </div>
                <div className="flex gap-4 items-center ml-1    ">
                  <p>Delivery charge</p>
                  <p className="flex items-center gap-2">
                    <span className="">Free</span>
                  </p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>{totalPrice}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p>No item</p>

              <Link
                onClick={close}
                to={"/"}
                className="bg-green-800 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        <div className="p-2">
          <div className="bg-green-800 text-neutral-100 px-4 font-bold lg:text-lg text-base py-4 sticky bottom-3 rounded flex items-center gap-4 justify-between">
            <div>{totalPrice}</div>

            <button
              onClick={redirectToCheckOutPage}
              className="flex items-center gap-1 cursor-pointer"
            >
              Proceed
              <span>
                <FaCaretRight size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenCart;
