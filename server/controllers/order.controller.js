import { Order } from "../models/Order.model.js";
import { Restaurant } from "../models/Restaurant.model.js";
import { User } from "../models/User.model.js";
import { Cart } from "../models/cart.model.js";
import { Menu } from "../models/menu.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchendller.js";

const orderproduct = asynchandler(async (req, res) => {
  const { productId, address,quantity } = req.body;

  // Validate productId and address
  if (!productId) {
    throw new ApiError(400, "Product not found");
  }

  if (!address) {
    throw new ApiError(400, "Address is required");
  }

  const customer = req.user._id;
console.log(customer)
  
  const menu = await Menu.findOne({ 'menuItems._id': productId });
  

  if (!menu) {
    throw new ApiError(404, 'Menu not found');
  }
  
  const restaurantid=menu.restaurantId;
  if (!restaurantid) {
    throw new ApiError(404, 'restaurant id not found');

  }
  const restaurant=await Restaurant.findById(restaurantid);
  
  if (!restaurant) {
    throw new ApiError(404, 'Restaurant name not found');

  };
  const Restaurantname=restaurant.Restaurantname;

  const menuItem = menu.menuItems.find(item => item._id.equals(productId));

  if (!menuItem) {
    throw new ApiError(404, 'Menu item not found');
  }
  const productname=menuItem.name;
  
  if (!productname) {
    throw new ApiError(404, 'productname not found');
  }
  const price = menuItem.price;
  if (!price) {
    throw new ApiError(404, 'price not found');
  }
 
  const newOrder = new Order({
    customer: customer,
    orderItems: [],
    quantity:quantity,
    address: address, 
    product: productId,
    orderPrice:quantity*price,
    Resturantname:Restaurantname,
    productname:productname
  });

  await newOrder.save();
  await Cart.findOneAndUpdate(
    { user: customer },
    { $pull: { items: { product: productId } } },
    { new: true }
  );
  
  
  res.status(201).json({ message: "Order created successfully", order: newOrder });
});


const cancelOrder=asynchandler(async(req,res)=>{
const {orderid} = req.body;
if(!orderid){
    throw new ApiError(402,"order id not found");
}
const deletedoeder = await Order.findByIdAndDelete(orderid);
if (!deletedoeder) {
    throw new ApiError(404, 'order id  not found');
  }
  res.status(200).json({ message: 'order cancel  successfully' });
});




  const showorder=asynchandler(async(req,res)=>{
    try {
      const customer=req.user._id;
     console.log(customer)
     const orders = await Order.find({ 'customer': customer});
      
      if(!orders){
          throw new ApiError(400,"user not persent")
      }
      return res
      .status(200)
      .json(orders)
    } catch (error) {
      throw new ApiError(400,"user not found")
    }
  })







export {
     orderproduct,
     cancelOrder,
     showorder
     };
