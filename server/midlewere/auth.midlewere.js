import { ApiError } from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchendller.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export const verifyjwt = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer', '');

    // console.log(token, 'token is found');
    if (!token) {
      throw new ApiError(401, 'unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      throw new ApiError(401, 'invalid Access token');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, 'invalid  access token request');
  }
});
