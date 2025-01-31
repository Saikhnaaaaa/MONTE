import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import CartProductModel from "../models/cartproduct.model.js";

export async function CashOnDeliveryOrderController(request, response) {
  try {
    const userId = request.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    const payload = list_items.map((item) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: item?.productId?._id,
        product_details: {
          name: item?.productId?.name,
          image: item?.productId?.image[0],
        },
        paymentId: "",
        payment_status: "Cash on delivery",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generatedOrder = await OrderModel.insertMany(payload);

    // remove from the cart

    const removeCartItems = await CartProductModel.deleteMany({
      userId: userId,
    });

    const updateInUser = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        shoppong_cart: [],
      }
    );

    return response.json({
      message: "Order placed successfully",
      error: false,
      success: true,
      data: generatedOrder,
    });

    // userId:
    // orderId: "ORD-"
    // productId:
    // product_details: {
    //     name: "",
    //     image: "",
    // }
    // payment_status:
    // delivery_address:
    // subTotalAmt:
    // totalAmt:

    // invoice_receipt:
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getOrderDetailsController(request, response) {
  try {
    const userId = request.userId; //order Id

    const orderList = await OrderModel.find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .populate("delivery_address");

    return response.json({
      message: "Order list fetched successfully",
      error: false,
      success: true,
      data: orderList,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
