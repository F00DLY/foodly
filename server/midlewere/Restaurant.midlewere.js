import { ApiError } from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchendller.js';
import jwt from 'jsonwebtoken';
import { Restaurant } from '../models/Restaurant.model.js';

export const verifyjwt = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
      throw new ApiError(401, 'unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken || !decodedToken._id) {
      throw new ApiError(400, error.message || 'Invalid access token request');
    }
    const restaurant = await Restaurant.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );
    if (!restaurant) {
      throw new ApiError(401, 'invalid Access token');
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    throw new ApiError(401, 'invalid  access token request');
  }
});
