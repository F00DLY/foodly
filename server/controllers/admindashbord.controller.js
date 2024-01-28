import { admin } from "../models/admin.model.js";
import { asynchandler } from "../utils/asynchendller.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import {ApiError} from "../utils/ApiError.js"

const genrateAccessAndRefrereshToken = async(adminId) =>{
    try {
     const Admin= await admin.findById(adminId);
    
     const accessToken=Admin.generateAccessToken();
     const refreshToken =Admin.generateRefreshToken();
   console.log(refreshToken,accessToken)
     Admin.refreshToken=refreshToken;
    await  Admin.save({ validateBeforeSave:false})

return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"somthing went wrong while genrating refresh and access token ")
    }
}


const registeradmin = asynchandler(async (req,res) => {
  
    const {email,password } =req.body;
    console.log(email,password);
    
    if(
        [email,password].some((filed)=>filed?.trim()==="")
    ){
    throw new ApiError(400,"All fileds are required")
    }
    
    const existadmin=await admin.findOne({email});
    if(existadmin){
        throw new ApiError(409,"user with email name already exist")
    }
    
    //const pictureLocalpath=req.files?.picture[0]?.path;
    
    
    
    
    const Admin=await admin.create({
        
        email,
        password,
       
        
    })
    
    
    
    
     const createdAdmin=await admin.findById(Admin._id).select(
        "-password -refreshToken"
     )
     if(!createdAdmin){
        throw new ApiError(509,"somthing is wrong when user resister")
     }
    
    
    
    
    
     return res.status(201).json(
        new Apiresponse(200,createdAdmin,"admin resistred succesfully")
     )
    
    })




const adminlogin = asynchandler(async (req,res) =>{
    const {email,password} = req.body;
    console.log(email,password)
    if(!email) {
        throw new ApiError(400,"email is required")
    }
    
    const Admin=await admin.findOne({email});
    if(!Admin){
        throw new ApiError(400,"admin not find");
    
    }
    
    const ispasswordValid=await Admin.isPasswordCorrect(password);
    if(!ispasswordValid){
        throw new ApiError(400,"password not match");
    
    }
    const {accessToken,refreshToken}=await genrateAccessAndRefrereshToken(Admin._id)
    
    const loggedIadmin=await admin.findById(Admin._id).select("-password -refreshToken");
    
    const option={
        httpOnly:true,
        secure:true
    }
    
    
    
    
    return res.status(201)
    .cookie("accessToken",accessToken, option)
    .cookie("refreshToken",refreshToken,option)
    .json(
    
    new Apiresponse(200,
        {
            Admin:loggedIadmin,accessToken,refreshToken
        },
        "User log in successfully")
    )
    })

    const logoutadmin=asynchandler(async(req,res)=>{
        await admin.findOneAndUpdate(
            req.Admin._id,{
        $set:{
            refreshToken:undefined
        }
            },{
                new:true
            })
        
            const option={
                httpOnly:true,
                secure:true
            }
            
            return res.status(200)
            .clearCookie("accessToken",option)
            .clearCookie("refreshToken",option)
            .json(new Apiresponse(200,{},"admin logged out successfully "))
            
            
        })


        const refreshAccessToken = asynchandler(async (req, res) => {
            const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
          console.log(incomingRefreshToken)
            if (!incomingRefreshToken) {
              throw new ApiError(401, "Unauthorized request");
            }
          
            try {
              const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
          
              const Admin = await admin.findById(decodedToken?._id);
          
              if (!Admin) {
                throw new ApiError(401, "Invalid refresh token");
              }
          
              if (incomingRefreshToken !== Admin?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired");
              }
          
              const options = {
                httpOnly: true,
                secure: true,
              };
          
              const { accessToken, newRefreshToken } = await genrateAccessAndRefrereshToken(user._id);
          
              return res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("newRefreshToken", newRefreshToken, options)
                .json(new Apiresponse(200, { accessToken, newRefreshToken }, "Access token refreshed"));
            } catch (error) {
              throw new ApiError(401, "Access token not found");
            }
          });
          

    export{
        adminlogin,registeradmin,logoutadmin,refreshAccessToken
    }