import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema(
    {
       orderPrice: {
            type: Number,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quantity: {
            type: Number,
            default: [],

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
