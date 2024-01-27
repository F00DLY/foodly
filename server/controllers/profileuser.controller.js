import { asynchandler } from "../utils/asynchendller.js";
import {User} from "../models/User.model.js"
import {ApiError} from "../utils/ApiError.js"
import { Apiresponse } from "../utils/Apiresponse.js";


const getUsername=asynchandler(async(req,res)=>{
  try {
    const userId=req.user._id;
   
    const user=await User.findById(userId)
    if(!user){
        throw new ApiError(400,"user not persent")
    }
    return res
    .status(200)
    .json(new Apiresponse(200,"user is found",user))
  } catch (error) {
    throw new ApiError(400,"user not found")
  }
})



export{
    getUsername
}