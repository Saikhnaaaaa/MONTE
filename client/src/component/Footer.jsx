import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t p-4 bg-red-500">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row gap-4 lg:justify-between justify-center items-center">
        <p>© All Rights Reserved 2024. </p>

        <div className="flex gap-4 justify-center items-center text-2xl">
          <a href="" className="hover:text-primary-100 transition-all duration-300 ">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100 transition-all duration-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
