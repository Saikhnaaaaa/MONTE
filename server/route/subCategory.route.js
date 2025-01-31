import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  AddSubCategoryController,
  DeleteSubCategoryController,
  GetSubCategoryController,
  UpdateSubCategoryController,
} from "../controllers/subCategory.controller.js";

const subCatRouter = Router();

subCatRouter.post("/create-sub-cat", auth, AddSubCategoryController);
subCatRouter.post("/get-sub-cat", GetSubCategoryController);
subCatRouter.put("/update-sub-cat", auth, UpdateSubCategoryController);
subCatRouter.delete("/delete-sub-cat", auth, DeleteSubCategoryController);

export default subCatRouter;
