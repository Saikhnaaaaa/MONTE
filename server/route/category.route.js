import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController, DeleteCategory, GetCategoryController, UpdateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddCategoryController);
categoryRouter.get('/get-category', GetCategoryController)
categoryRouter.put('/update-category', auth, UpdateCategoryController)
categoryRouter.delete("/delete-category", auth, DeleteCategory)

export default categoryRouter;
