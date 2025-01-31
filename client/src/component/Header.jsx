import React, { useEffect, useState } from "react";
import logo from "../assets/montemebel.jpg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { useGlobalContext } from "../provider/GlobalPRovider";
import OpenCart from "./OpenCart";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state?.cartItem.cart);
  const [openCart, setOpenCart] = useState(false);

  const { totalPrice, totalQty } = useGlobalContext();

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileMenu = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className=" h-30  lg:h-20 shadow-md sticky top-0 z-50 bg-white flex items-center justify-between flex-col gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between  px-2">
          {/* logo */}
          <div>
            <Link to="/">
              <img
                src={logo}
                width={150}
                height={150}
                alt="Logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={150}
                alt="Logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and my Cart */}
          <div>
            {/* user icons display in only mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileMenu}
            >
              <FaRegUserCircle size={26} />
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex select-none items-center gap-2 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>

                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded-lg  p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCart(!openCart)}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-3 py-2 rounded text-white "
              >
                {/* add to cart icons */}
                <div className="animate-bounce ">
                  <TiShoppingCart size={30} />
                </div>
                <div className="font-semibold text-sm">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{totalPrice}T</p>
                    </div>
                  ) : (
                    <div>
                      <p>My Cart</p>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden p-3">
        <Search />
      </div>

      {openCart && <OpenCart close= {() => setOpenCart(false)} />}
    </header>
  );
};

export default Header;
