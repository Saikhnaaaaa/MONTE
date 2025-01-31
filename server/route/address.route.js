import { Router } from "express";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";
import auth from "../middleware/auth.js";

const addressRouter = Router();

addressRouter.post("/create-address", auth, addAddressController);
addressRouter.get("/get-address", auth, getAddressController);
addressRouter.put("/update-address", auth, updateAddressController);
addressRouter.delete("/delete-address", auth, deleteAddressController);

export default addressRouter;
