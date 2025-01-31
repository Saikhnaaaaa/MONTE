import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded p-4 w-full max-w-md ">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h1 className="text-xl font-semibold">Add Field</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter field name "
          className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded w-full "
          value={value}
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="bg-primary-200 px-4 py-2 rounded mx-auto mt-4 w-fit block hover:border-primary-200 hover:border-2 hover:bg-white transition-all duration-300"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
