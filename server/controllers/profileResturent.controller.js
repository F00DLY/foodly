import { asynchandler } from '../utils/asynchendller.js';

import { ApiError } from '../utils/ApiError.js';
import { Apiresponse } from '../utils/Apiresponse.js';
import { Restaurant } from '../models/Restaurant.model.js';

const getresturentprofile = asynchandler(async (req, res) => {
  try {
    const resturentId = req.restaurant._id;

    const restaurant = await Restaurant.findById(resturentId);
    if (!restaurant) {
      throw new ApiError(400, 'user not persent');
    }

    return res
      .status(200)
      .json(new Apiresponse(200, 'restaurant account is found', restaurant));
  } catch (error) {
    throw new ApiError(400, 'resturent account is not found');
  }
});

export { getresturentprofile };
