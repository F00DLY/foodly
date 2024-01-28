import { asynchandler } from '../utils/asynchendller.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.model.js';
import { uploadoncloidinary } from '../utils/cloudanry.js';
import { Apiresponse } from '../utils/Apiresponse.js';
import jwt from 'jsonwebtoken';

const genrateAccessAndRefrereshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log(user);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    console.log(refreshToken, accessToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'somthing went wrong while genrating refresh and access token '
    );
  }
};

const registerUser = asynchandler(async (req, res) => {
  const { Name, email, password, mobail } = req.body;
  console.log(email, password);

  if ([Name, email, password, mobail].some((filed) => filed?.trim() === '')) {
    throw new ApiError(400, 'All fileds are required');
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(409, 'user with email name already exist');
  }

  //const pictureLocalpath=req.files?.picture[0]?.path;

  let pictureLocalpath;
  if (
    req.files &&
    Array.isArray(req.files.picture) &&
    req.files.picture.length > 0
  ) {
    pictureLocalpath = req.files.picture[0].path;
  }

  const picture = await uploadoncloidinary(pictureLocalpath);

  const user = await User.create({
    Name,
    picture: picture?.url || '',
    email,
    password,
    mobail,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  if (!createdUser) {
    throw new ApiError(509, 'somthing is wrong when user resister');
  }

  return res
    .status(201)
    .json(new Apiresponse(200, createdUser, 'user resistred succesfully'));
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email) {
    throw new ApiError(400, 'email is required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, 'user not find');
  }

  const ispasswordValid = await user.isPasswordCorrect(password);
  if (!ispasswordValid) {
    throw new ApiError(400, 'password not match');
  }
  const { accessToken, refreshToken } = await genrateAccessAndRefrereshToken(
    user._id
  );

  const loggedInuser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie('accessToken', accessToken, option)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new Apiresponse(
        200,
        {
          user: loggedInuser,
          accessToken,
          refreshToken,
        },
        'User log in successfully'
      )
    );
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', option)
    .clearCookie('refreshToken', option)
    .json(new Apiresponse(200, {}, 'user logged out successfully '));
});

const refreshAccessToken = asynchandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  console.log(incomingRefreshToken);
  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired');
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await genrateAccessAndRefrereshToken(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('newRefreshToken', newRefreshToken, options)
      .json(
        new Apiresponse(
          200,
          { accessToken, newRefreshToken },
          'Access token refreshed'
        )
      );
  } catch (error) {
    throw new ApiError(401, 'Access token not found');
  }
});

const changeCurrentPassword = asynchandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldpassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old password');
  }

  user.password = newpassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new Apiresponse(200, {}, 'password change successfuly'));
});

const deletuseraccount = asynchandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    console.log('user id not found');
    throw new ApiError(400, 'User ID not found');
  }
  const deleteduser = await User.findByIdAndDelete(userId);
  if (!deleteduser) {
    console.log('account not found');
    throw new ApiError(404, 'account   not found');
  }
  res.status(200).json({ message: 'account deleted   successfully' });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  deletuseraccount,
};
