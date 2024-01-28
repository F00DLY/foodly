import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema(
    {
       orderPrice: {
            type: Number,
            required: true,
        },
        username:{
            type:String
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quantity: {
            type: Number,
            
        },
        product:{
            type: String,

        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING",
        },
        address:{
            type:String,
           
        },
        payment: {
            type: String,
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
        restaurantid:{
            type:String
        },
        Resturantname:{
            type:String
        },
        productname:{
            type:String
        }
        
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
