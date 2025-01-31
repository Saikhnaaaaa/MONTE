import subCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Enter required fields",
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const addSubCategory = new subCategoryModel(payload);

    const saveSubCategory = await addSubCategory.save();

    return response.json({
      message: "Sub category added successfully",
      error: false,
      success: true,
      data: saveSubCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const GetSubCategoryController = async (request, response) => {
  try {
    const data = await subCategoryModel
      .find()
      .sort({ createdAt: -1 })
      .populate("category");

    return response.json({
      message: "Sub category fetched successfully",
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

export const UpdateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await subCategoryModel.findById({ _id });

    if (!checkSub) {
      return response.status(400).json({
        message: "Sub category not found",
        error: true,
        success: false,
      });
    }

    const update = await subCategoryModel.findByIdAndUpdate(
      { _id: _id },
      {
        ...(name && { name }),
        ...(image && { image }),
        ...(category && { category }),
      }
    );

    return response.json({
      message: "Sub category updated successfully",
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

export const DeleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const deleteSubcategory = await subCategoryModel.findByIdAndDelete({ _id });

    return response.json({
      message: "Sub category deleted successfully",
      error: false,
      success: true,
      data: deleteSubcategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
