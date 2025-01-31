import React, { useEffect, useState } from "react";
import { use } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    if (location.pathname === "/search") {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [location.pathname]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div className="w-full min-w-[320px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-700 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-[6px] m-1 bg-white rounded-full shadow-md group-focus-within:text-primary-200 "
          >
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-4 group-focus-within:text-primary-200 ">
            <IoSearch size={20} />
          </button>
        )}
      </div>

      <div>
        {!isSearchPage ? (
          //not in search page
          <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                'Search "Milk"',
                1000,
                'Search "Bread"',
                1000,
                'Search "Chocolate"',
                1000,
              ]}
              wrapper="div"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //in search page
          <div>
            <input
              type="text"
              placeholder="Search"
              autoFocus
              defaultValue={searchText}
              className="bg-transparent w-full outline-none "
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
