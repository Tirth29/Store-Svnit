import { asyncError } from "../middleware/error.js";
import { User } from "../models/user.js";
import errorHanlder from "../utils/error.js";
import { cookieOptions, sendEmail, sendToken } from "../utils/features.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  // handle error
  if (!user) {
    return next(new errorHanlder("Incorrect Email or Password", 400));
  }
  if (!password) return next(new errorHanlder("Please enter password"), 400);

  const isMatched = await user.comparePassword(password);
  console.log(isMatched);
  if (!isMatched) {
    return next(new errorHanlder("Incorrect Email or Password", 400));
  }
  sendToken(user, res, `Welcome back ${user.name}`, 200);
});

export const signup = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;
  let user = await User.findOne({ email });
  if (user) return next(new errorHanlder("Email already exists", 400));
  // req.file
  let avatar = undefined;

  if (req.file) {
    const file = getDataUri(req.file);
    // add cloudinary here
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    console.log(myCloud);
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    console.log(avatar);
  }

  user = await User.create({
    avatar,
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });
  sendToken(user, res, `Registered Successfully`, 201);
});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

export const logOut = asyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Log Out Successfully",
    });
});

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user.email);
  const { name, email, address, city, country, pinCode } = req.body;
  console.log(email);
  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new errorHanlder("Please enter all fields"), 400);
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) return next(new errorHanlder("Incorrect old password"), 400);
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const updatePic = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = getDataUri(req.file);
  console.log(user.avatar.public_id);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  console.log(user.avatar.public_id);

    // add cloudinary here
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    console.log(myCloud);
    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    await user.save();

  res.status(200).json({
     success: true, 
     message:"Avatar updated successfully"
    });
});
export const forgetPassword = asyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new errorHanlder("Incorrect Email", 404));
  // max,min 2000,10000
  // math.random()*(max-min)+min

  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);
  await user.save();
  console.log("Hi1");
  const message = `Your OTP for Reseting Password is ${otp}.\n Please ignore if you haven't requested this.`;
  try {
  console.log("Hi2");

    await sendEmail("OTP For Reseting Password", user.email, message);
  console.log("Hi3");

  } catch (error) {
  console.log("Hi4");

    user.otp = null;
    user.otp_expire = null;
    await user.save();
    return next(error);
  }
  console.log("Hi5");

  res.status(200).json({
    success: true,
    message: `Email Sent To ${user.email}`,
  });
});

export const resetPassword = asyncError(async (req, res, next) => {
  const { otp, password } = req.body;

  const user = await User.findOne({
    otp,
    otp_expire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new errorHanlder("Incorrect OTP or has been expired", 400));

  if (!password)
    return next(new errorHanlder("Please Enter New Password", 400));

  user.password = password;
  user.otp = undefined;
  user.otp_expire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully, You can login now",
  });
});

