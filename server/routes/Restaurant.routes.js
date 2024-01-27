import {Router}  from "express"
import { loginRestaurant, logoutRestaurant, registerRestaurant,refreshAccessToken, deletresturentaccount } from "../controllers/Restaurant.controller.js"
import {verifyjwt} from "../midlewere/Restaurant.midlewere.js"
import { changeCurrentPassword } from "../controllers/Restaurant.controller.js";
import { removeMenuItem, showMenu, updateManu } from "../controllers/menu.controller.js";
import { getResturantname } from "../controllers/resturentname.controller.js";
import { getresturentprofile } from "../controllers/profileResturent.controller.js";




const router = Router()

router.route("/register").post(registerRestaurant);
    router.route("/login").post(loginRestaurant)
  // secured routes
  router.route("/logOut").post(verifyjwt,logoutRestaurant)
  router.route("/refresh-token").post(refreshAccessToken)
  router.route("/password-change").post(verifyjwt,changeCurrentPassword)
  router.route("/menu-update").post(verifyjwt,updateManu)
  router.route("/menu-remove").post(verifyjwt,removeMenuItem)
  router.route("/show-menu").post(showMenu)
  router.route("/get-names").post(getResturantname)
  router.route("/profile-delet").post(verifyjwt,deletresturentaccount)
  router.route("/account").post(verifyjwt,getresturentprofile)






export default router