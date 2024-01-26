import { Restaurant } from '../models/Restaurant.model.js';
import { Menu } from '../models/menu.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchendller.js';

const updateManu = asynchandler(async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const restaurantOwner = await Restaurant.findById(restaurantId);
    if (!restaurantOwner) {
      throw new ApiError(404, 'Restaurant owner not found');
    }

    const { name, description, price } = req.body;

    const newMenuItem = {
      name,
      description,
      price,
    };

    // Validate that required fields are provided
    if (newMenuItem.name === undefined || newMenuItem.price === undefined) {
      throw new ApiError(400, 'Name and price are required for the menu item');
    }

    // Set the restaurantId for the menu item
    newMenuItem.restaurantId = restaurantOwner._id;

    let restaurantMenu = await Menu.findOne({ restaurantId: restaurantOwner });

    if (!restaurantMenu) {
      restaurantMenu = new Menu({
        restaurantId: restaurantOwner,
        menuItems: [newMenuItem],
      });
    } else {
      restaurantMenu.menuItems.push(newMenuItem);
    }

    await restaurantMenu.save();

    return res.status(200).json({
      success: true,
      message: 'Menu item is updated successfully',
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, 'Internal server error. Please try again later.');
    }
  }
});

const removeMenuItem = asynchandler(async (req, res) => {
  try {
    const { Restaurantname } = req.body;
    const { menuItemId } = req.body;

    const restaurantOwner = await Restaurant.findOne({ Restaurantname });
    if (!restaurantOwner) {
      throw new ApiError(404, 'Restaurant owner not found');
    }

    const restaurantId = restaurantOwner._id;

    let restaurantMenu = await Menu.findOne({ restaurantId });

    if (!restaurantMenu) {
      throw new ApiError(404, 'Menu not found for the restaurant');
    }

    const itemIndex = restaurantMenu.menuItems.findIndex(
      (item) => menuItemId.toString() === menuItemId
    );

    if (itemIndex === -1) {
      throw new ApiError(404, 'Menu item not found');
    }

    restaurantMenu.menuItems.splice(itemIndex, 1);

    await restaurantMenu.save();

    return res.status(200).json({
      success: true,
      message: 'Menu item is removed successfully',
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.',
      });
    }
  }
});

const showMenu = asynchandler(async (req, res) => {
  try {
    const { Restaurantname } = req.body;

    if (!Restaurantname) {
      throw new ApiError(
        400,
        'Restaurant name is required in the request body.'
      );
    }

    const restaurant = await Restaurant.findOne({ Restaurantname });

    if (!restaurant) {
      throw new ApiError(404, 'Restaurant not found');
    }

    const restaurantMenu = await Menu.findOne({ restaurantId: restaurant._id });

    if (!restaurantMenu) {
      throw new ApiError(404, 'Menu not found for the restaurant');
    }

    return res.status(200).json({
      success: true,
      menu: restaurantMenu.menuItems,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, 'Internal server error. Please try again later.');
    }
  }
});

export { updateManu, showMenu, removeMenuItem };
