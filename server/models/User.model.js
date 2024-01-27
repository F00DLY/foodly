import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        Name:{
         type:String,
            required:true,
            index:true,
            trim:true
        },
        email:{
          type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
        
        picture:{
            type:String, // clpudnary url

        },
        password:{
            type:String,
            required:[true,'password is required']
        },
        refreshToken:{
            type:String
        },
        mobail : {
            type:Number,
            required:true,
            unique:true
        }

    },
    {timestamps : true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name, // Fix the typo here
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };
  
userSchema.methods.generateRefreshToken = async function () {
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


export const User= mongoose.model("User",userSchema)