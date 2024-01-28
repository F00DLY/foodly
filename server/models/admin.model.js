import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const admindashSchema= new mongoose.Schema(
    {
        email:{
            type:String,
              required:true,
              
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
    })


    admindashSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10); // Fix: Use await to handle the async bcrypt.hash
        next();
      });
      
      admindashSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
      };
      
      admindashSchema.methods.generateAccessToken = function () {
        return jwt.sign(
          {
            _id: this._id,
            email: this.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
      };
      
      admindashSchema.methods.generateRefreshToken = async function () {
        return await jwt.sign(
          {
            _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
          }
        );
      };
      

    export const admin=mongoose.model("admin",admindashSchema)