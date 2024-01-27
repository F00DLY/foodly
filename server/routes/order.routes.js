import {Router}  from "express"
import { verifyjwt } from "../midlewere/auth.midlewere.js"
import { cancelOrder, orderproduct, showorder } from "../controllers/order.controller.js"






const router = Router()



router.route("/order-now").post(verifyjwt,orderproduct)
router.route("/cancel-order").post(verifyjwt,cancelOrder)
router.route("/show-order").post(verifyjwt,showorder)



export default router