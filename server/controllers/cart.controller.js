import { Cart } from '../models/cart.model.js';
import { Menu } from '../models/menu.model.js';

import { ApiError } from '../utils/ApiError.js';
import { Apiresponse } from '../utils/Apiresponse.js';
import { asynchandler } from '../utils/asynchendller.js';

const creatcart = asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new ApiError(400, 'User ID not found');
    }
    const existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {
      throw new ApiError(400, 'This user already has a cart');
    }
    const newCart = new Cart({
      user: userId,
      items: [],
    });

    await newCart.save();
    return res.status(200).json(new Apiresponse(201, 'new cart created'));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'server problem');
  }
});

const additem = asynchandler(async (req, res) => {
  const { menuItemId, quantity } = req.body;

  if (!menuItemId || !quantity || quantity < 1) {
    throw new ApiError(
      400,
      'Invalid request. menuItemId and positive quantity are required.'
    );
  }

  const userId = req.user._id;
  let userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    userCart = await Cart.create({ user: userId, items: [] });
  }

  const menu = await Menu.findOne({ 'menuItems._id': menuItemId });

  if (!menu) {
    throw new ApiError(404, 'Menu not found.');
  }

  const menuItem = menu.menuItems.find(
    (item) => item && item._id && item._id.equals(menuItemId)
  );

  if (!menuItem) {
    throw new ApiError(404, 'Menu item not found in the menu.');
  }

  const existingCartItemIndex = userCart.items.findIndex(
    (item) => item && item.menuItemId && item.menuItemId.equals(menuItemId)
  );

  if (existingCartItemIndex !== -1) {
    userCart.items[existingCartItemIndex].quantity += quantity;
  } else {
    userCart.items.push({ productId: menuItem._id, quantity });
  }

  await userCart.save();

  res
    .status(201)
    .json({ success: true, message: 'Item added to the cart successfully' });
});
const removecartitem = asynchandler(async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      throw new ApiError(400, 'Invalid request. itemId is required.');
    }

    const userId = req.user._id;
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      throw new ApiError(404, 'User does not have a cart.');
    }

    const cartItemIndex = userCart.items.findIndex(
      (item) => item && item._id && item._id.equals(itemId)
    );

    if (cartItemIndex !== -1) {
      userCart.items.splice(cartItemIndex, 1);

      await userCart.save();
      return res
        .status(200)
        .json({ success: true, message: 'Cart item removed successfully' });
    } else {
      throw new ApiError(404, 'Cart item not found in the cart.');
    }
  } catch (error) {
    console.error('Error in Remove Cart Item Controller:', error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: 'Internal server error. Please try again later.',
        });
    }
  }
});

export { creatcart, additem, removecartitem };
