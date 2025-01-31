import React from "react";
import { useSelector } from "react-redux";

const MyOrder = () => {
  const orders = useSelector((state) => state?.orders?.order);
  console.log(orders, "orders");

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Orders</h1>
      </div>
      {orders[0] && <p>No data</p>}

      {orders?.map((item, index) => {
        return (
          <div key={index + item._id} className="rounded p-4 text-sm">
            <p>Order Id: {item?.orderId}</p>
            <div className="flex gap-3">
              <img
                src={item.product_details.image[0]}
                alt=""
                className="w-14 h-14"
              />
              <p className="font-medium ml-2">{item.product_details.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;
