import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.get("/get-order-details", auth, getOrderDetailsController);

export default orderRouter;
