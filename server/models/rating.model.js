import mongoose from "mongoose";



const ratingSchema= new mongoose.Schema(
    {
Rating:{
    type:Number,
    required: true
},
RestaurantId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
},
Restaurantname:{
type:String,

}



},
    {timestamps:true})




    export const Rating=mongoose.model("Rating",ratingSchema)