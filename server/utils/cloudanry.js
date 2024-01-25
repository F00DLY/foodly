import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET,
});


const uploadoncloidinary = async (localfilepath) =>{
    try {
        if(!localfilepath) return null
        // upload file
        const responce=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        // file has been upload successfully
        console.log("file is uploaded on cloudinary",responce.url);
        return responce

    } catch (error) {
        console.log(error)
        fs.unlinkSync(localfilepath)   // remove localfile temmpreiy file when upload is fail
       return null
    }
}

export {uploadoncloidinary}