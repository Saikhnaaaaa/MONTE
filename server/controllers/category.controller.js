import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import subCategoryModel from "../models/subCategory.model.js";

export const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.json({
        error: true,
        success: false,
        message: "Enter required fields",
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return response.status(500).json({
        message: "Category Not Created!",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Added Category Successfully",
      error: false,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
};

export const GetCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 })
    return response.json({
      message: "Category fetched successfully",
      error: false,
      success: true,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const UpdateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    const update = await CategoryModel.updateOne(
      { _id: _id },
      {
        ...(name && { name }),
        ...(image && { image }),
      }
    );

    return response.json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const DeleteCategory = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await subCategoryModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "Category cannot be deleted",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id });

    return response.json({
      message: "Category deleted successfully",
      error: false,
      success: true,
      data: deleteCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
