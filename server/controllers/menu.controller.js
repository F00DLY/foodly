import { Restaurant } from '../models/Restaurant.model.js';
import { Menu } from '../models/menu.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchendller.js';

const updateManu = asynchandler(async (req, res) => {
  try {
    const Restaurantname = req.body.restaurantName.name;
    console.log(Restaurantname, '|||||||||||||||||||||');

    const restaurantOwner = await Restaurant.findOne({ Restaurantname });
    console.log(restaurantOwner, 'ram ram');
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
    console.error('Error in Update Menu Controller:', error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, 'Internal server error. Please try again later.');
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
    console.error('Error in Show Menu Controller:', error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, 'Internal server error. Please try again later.');
    }
  }
});

export { updateManu, showMenu };
