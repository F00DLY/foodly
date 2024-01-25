import{Cart} from "../models/cart.model.js"
import { Menu } from "../models/menu.model.js"
import{User} from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { asynchandler } from "../utils/asynchendller.js"



const creatcart = asynchandler(async(req,res)=>{
    try {
        const userId = req.user._id;

        if (!userId) {
          throw new ApiError(400, "User ID not found");
        }
        const existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
      throw new ApiError(400, "This user already has a cart");
    }
    const newCart = new Cart({
        user: userId,
        items: [],
      });
  
          await newCart.save();
    return res.status(200)
    .json( new Apiresponse (201,"new cart created"))
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"server problem")
        
    }

})


const additem = asynchandler(async (req, res) => {
  const { menuItemId, quantity } = req.body;

  // Validate input
  if (!menuItemId || !quantity || quantity < 1) {
    throw new ApiError(400, 'Invalid request. menuItemId and positive quantity are required.');
  }

  // Find or create the user's cart based on the user ID
  const userId = req.user._id; // Assuming you have authentication middleware that adds the user to req.user
  let userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    userCart = await Cart.create({ user: userId, items: [] });
  }

  // Find the corresponding menu with menuItems
  const menu = await Menu.findOne({ 'menuItems._id': menuItemId });

  if (!menu) {
    throw new ApiError(404, 'Menu not found.');
  }

  // Find the specific menuItem in the menuItems array
  const menuItem = menu.menuItems.find(item => item && item._id && item._id.equals(menuItemId));

  if (!menuItem) {
    throw new ApiError(404, 'Menu item not found in the menu.');
  }

  // Check if the item is already in the cart
  const existingCartItemIndex = userCart.items.findIndex(item => item && item.menuItemId && item.menuItemId.equals(menuItemId));

  if (existingCartItemIndex !== -1) {
    // If the item is already in the cart, update the quantity
    userCart.items[existingCartItemIndex].quantity += quantity;
  } else {
    // If the item is not in the cart, add a new cart item
    userCart.items.push({ productId: menuItem._id, quantity }); // Set productId here
  }

  // Save the updated cart
  await userCart.save();

  res.status(201).json({ success: true, message: 'Item added to the cart successfully' });
});





export{
    creatcart,
    additem
}