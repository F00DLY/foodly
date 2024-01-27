import {Router}  from "express"
import { changeCurrentPassword, deletuseraccount, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js"
import{upload} from "../midlewere/multer.midlewere.js"
import { verifyjwt } from "../midlewere/auth.midlewere.js"
import { getUsername } from "../controllers/profileuser.controller.js"




const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"picture",
            maxCount:1
        }
    ]),
    registerUser);
    router.route("/login").post(loginUser)
  // secured routes
  router.route("/logOut").post(verifyjwt,logoutUser)
  router.route("/refresh-token").post(refreshAccessToken)
  router.route("/password-change").post(verifyjwt,changeCurrentPassword)
  router.route("/profile").post(verifyjwt,getUsername)
  router.route("/account-delet").post(verifyjwt,deletuseraccount)
export default router