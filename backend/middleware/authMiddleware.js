// Purpose of this middleWare, After creating jwt token while use login and add that token to
// http only cookie server Npw we want to pass that token to other user route request. To pass that jwt token
// we have created this middlware

// paasing token means: We will extract jwt token by using cookie parser then will verify that token.
// after that will extract userID(hence able to fetch whole user object from database..) and add User object in req.
// So i can use user infromation in other routes when in case of user is logged in.

import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
