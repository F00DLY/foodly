import { asynchandler } from '../utils/asynchendller.js';
import { ApiError } from '../utils/ApiError.js';
import { Restaurant } from '../models/Restaurant.model.js';
import { Apiresponse } from '../utils/Apiresponse.js';
import jwt from 'jsonwebtoken';

const generateAccessToken = (restaurant) => {
  return jwt.sign(
    {
      _id: restaurant._id,
      email: restaurant.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (restaurant) => {
  return jwt.sign(
    {
      _id: restaurant._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const genrateAccessAndRefrereshToken = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    const accessToken = generateAccessToken(restaurant);
    const refreshToken = generateRefreshToken(restaurant);

    restaurant.refreshToken = refreshToken;
    await restaurant.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

const registerRestaurant = asynchandler(async (req, res) => {
  const { Restaurantname, email, password, mobail } = req.body;

  if (
    ![Restaurantname, email, password, mobail].every(
      (field) => field.trim() !== ''
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const existRestaurant = await Restaurant.findOne({ email });
  if (existRestaurant) {
    throw new ApiError(409, 'Restaurant with this email already exists');
  }

  const restaurant = await Restaurant.create({
    Restaurantname,
    email,
    password,
    mobail,
  });

  const createdRestaurant = await Restaurant.findById(restaurant._id).select(
    '-password -refreshToken'
  );

  if (!createdRestaurant) {
    throw new ApiError(
      500,
      'Something went wrong when registering the restaurant'
    );
  }

  return res
    .status(201)
    .json(
      new Apiresponse(
        200,
        createdRestaurant,
        'Restaurant registered successfully'
      )
    );
});

const loginRestaurant = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const restaurant = await Restaurant.findOne({ email });

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  const isPasswordValid = await restaurant.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Password does not match');
  }

  const { accessToken, refreshToken } = await genrateAccessAndRefrereshToken(
    restaurant._id
  );

  const loggedInRestaurant = await Restaurant.findById(restaurant._id).select(
    '-password -refreshToken'
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new Apiresponse(
        200,
        { restaurant: loggedInRestaurant, accessToken, refreshToken },
        'Restaurant logged in successfully'
      )
    );
});

const logoutRestaurant = asynchandler(async (req, res) => {
  console.log(req);
  await Restaurant.findOneAndUpdate(
    { _id: req.restaurant._id },
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new Apiresponse(200, {}, 'Restaurant logged out successfully'));
});

const refreshAccessToken = asynchandler(async (req, res) => {
  const incomingrefreshToken =
    req.cookies.refreshAccessToken || req.body.refreshToken;
  if (!incomingrefreshToken) {
    throw new ApiError(401, 'unauthrized request');
  }
  try {
    const decodedToken = jwt.verify(
      incomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const restaurant = await Restaurant.findById(decodedToken?._id);
    if (!restaurant) {
      throw new ApiError(401, 'invalid refresh token');
    }

    if (incomingrefreshToken !== restaurant?.refreshToken) {
      throw new ApiError(401, 'refresh token is expaired');
    }

    const option = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await genrateAccessAndRefrereshToken(restaurant._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, option)
      .cookie('newrefreshToken', newrefreshToken, option)
      .json(
        new Apiresponse(
          200,
          { accessToken, newrefreshToken },
          'Accesstoken refreshed'
        )
      );
  } catch (error) {
    throw new ApiError(401, 'access token not found');
  }
});

const changeCurrentPassword = asynchandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;

  const restaurant = await Restaurant.findById(req.restaurant?._id);

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  const isPasswordCorrect = await restaurant.isPasswordCorrect(oldpassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old password');
  }

  restaurant.password = newpassword;
  await restaurant.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new Apiresponse(200, {}, 'Password changed successfully'));
});

export {
  registerRestaurant,
  loginRestaurant,
  logoutRestaurant,
  refreshAccessToken,
  changeCurrentPassword,
};
