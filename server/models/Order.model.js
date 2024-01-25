import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});


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
        orderItems: {
            type: [OrderItemSchema],
            default: [],
        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING",
        },
        address:{
            type:String,
            enum:[Aryabhatta_hostal,rnt_hostel,gargi_hostel,sports_complex,knowledge_park,ece_building,csa_building,tsr_park,guest_house]
        },
        payment: {
            type: String,
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
        
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
