import { asynchandler } from '../utils/asynchendller.js';
import { Restaurant } from '../models/Restaurant.model.js';

const getResturantname = asynchandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find(
      {},
      '_id Restaurantname varified  active'
    );
    const restaurantData = restaurants.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.Restaurantname,
      varified: restaurant.varified,
      active: restaurant.active,
    }));
    res.json({ restaurants: restaurantData });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const resturentstatuschange = asynchandler(async (req, res) => {
  try {
    const { varified, restaurantid } = req.body;
    console.log('Request Data:', { varified, restaurantid });

    const restaurant = await Restaurant.findById(restaurantid);

    if (!restaurant) {
      throw new ApiError(400, 'resturent  not found');
    }

    restaurant.varified = varified;
    await restaurant.save();

    return res
      .status(200)
      .json({ success: true, message: 'Status changed successfully' });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Failed to update order status');
  }
});

export { getResturantname, resturentstatuschange };
