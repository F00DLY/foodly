import { ApiError } from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchendller.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export const verifyjwt = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.header('Authorization')?.replace('Bearer ', '') || '').trim();

    // Log token for debugging
    console.log('||||Token||||');
    console.log(token);

    // Check if the token is present
    if (!token) {
      throw new ApiError(401, 'Unauthorized request: Token is missing');
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Log decoded token for debugging
    console.log('Decoded Token:', decodedToken);

    // Check if the user exists based on the decoded token
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      throw new ApiError(401, 'Invalid access token: User not found');
    }

    // Attach user information to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    throw new ApiError(401, 'Invalid access token');
  }
});
