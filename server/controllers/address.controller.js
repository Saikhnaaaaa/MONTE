import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
  try {
    const userId = request.userId;

    const { address_line, city, state, country, pincode, mobile } =
      request.body;

    if (!address_line || !city || !state || !country || !pincode || !mobile) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });

    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return response.json({
      message: "Address added successfully",
      error: false,
      success: true,
      data: saveAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (request, response) => {
  try {
    const userId = request.userId;

    const data = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return response.json({
      data,
      message: "Address fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateAddressController = async (request, response) => {
  try {
    const userId = request.userId;

    const { _id, address_line, city, state, country, pincode, mobile } =
      request.body;

    const updateAddress = await AddressModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        address_line,
        city,
        state,
        country,
        pincode,
        mobile,
      }
    );

    return response.json({
      message: "Address updated successfully",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (request, response) => {
  try {
    const userId = request.userId;

    const { _id } = request.body;

    const disableAddress = await AddressModel.updateOne(
      { _id: _id, userId },
      {
        status: false,
      }
    );

    return response.json({
      message: "Address disabled successfully",
      error: false,
      success: true,
      data: disableAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
