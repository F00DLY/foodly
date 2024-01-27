import mongoose from "mongoose";



const ratingSchema= new mongoose.Schema(
    {
Rating:{
    type:Number
},
Restaurantname:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
}



},
    {timestamps:true})




    export const Rating=mongoose.model("Rating",ratingSchema)