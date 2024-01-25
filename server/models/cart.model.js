import mongoose from "mongoose";


const CartItemSchema = new mongoose.Schema({
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

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: {
            type: [CartItemSchema],
            default: [],
        },
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);


