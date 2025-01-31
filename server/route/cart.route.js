import {Router} from "express"
import auth from "../middleware/auth.js";
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from "../controllers/cart.controller.js";

const cartRouter = Router();


cartRouter.post("/create-cart", auth, addToCartItemController )
cartRouter.get( "/get-cart", auth, getCartItemController)
cartRouter.put("/update-qty", auth, updateCartItemQtyController)
cartRouter.delete("/delete-cart-Item", auth , deleteCartItemQtyController)



export default cartRouter;