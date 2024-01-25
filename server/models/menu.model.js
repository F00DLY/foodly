import mongoose from "mongoose";


const MenuItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  });






const ManuSchema=new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant', // Reference to the Restaurant model
            required: true,
          },
          menuItems: {
            type: [MenuItemSchema],
            default: [],
          },
    },
    {timestamps:true})



   export const Menu=mongoose.model("Menu",ManuSchema)