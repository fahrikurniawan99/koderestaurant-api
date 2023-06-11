const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../User/model");

const decodeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? String(req.headers.authorization).replace("Bearer ", "")
      : null;
    if (!token) {
      const error = new Error("kamu tidak memiliki akses");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    const accessTokenPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const user = await User.findById(accessTokenPayload.userId);
    if (!user) {
      const error = new Error("user tidak terdaftar");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = decodeToken;
