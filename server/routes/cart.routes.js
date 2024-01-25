import {Router}  from "express"
import { verifyjwt } from "../midlewere/auth.midlewere.js"
import { additem, creatcart } from "../controllers/cart.controller.js"






const router = Router()



router.route("/create-cart").post(verifyjwt,creatcart)
router.route("/add-cart").post(verifyjwt,additem)


export default router