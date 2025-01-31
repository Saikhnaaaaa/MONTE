import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  deleteProductDetails,
  getAllProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";
const productRouter = Router();

productRouter.post("/create-product", admin, auth, createProductController);
productRouter.post("/get-all-product", getAllProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);
productRouter.put("/update-product-details", auth, admin, updateProductDetails);
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);
productRouter.post("/search-product", searchProduct);

export default productRouter;
