import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm p-4 rounded-lg ">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-red-800">
            Permanent Delete
          </h1>
          <button>
            <IoClose size={25} onClick={close} />
          </button>
        </div>
        <p className="my-4 text-sm text-neutral-600">
          Are you sure you want to delete this item?
        </p>
        <div className="w-fit ml-auto gap-3 flex items-center justify-between">
          <button
            onClick={cancel}
            className="flex-1 bg-red-100 text-red-800 font-medium rounded-md  py-[1px]  border border-red-800 hover:bg-red-700 hover:text-white px-3"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="flex-1 bg-green-100 text-green-800 font-medium rounded-md mx-2 py-[1px] border  px-3 border-green-800 hover:bg-green-700 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
