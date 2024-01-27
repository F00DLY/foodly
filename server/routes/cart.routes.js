import {Router}  from "express"
import { verifyjwt } from "../midlewere/auth.midlewere.js"
import { additem, creatcart, removecartitem, showcart } from "../controllers/cart.controller.js"






const router = Router()



router.route("/create-cart").post(verifyjwt,creatcart)
router.route("/add-cart").post(verifyjwt,additem)
router.route("/remove-cartitem").post(verifyjwt,removecartitem)
router.route("/show-cartitem").post(verifyjwt,showcart)



export default router