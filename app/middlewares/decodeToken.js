const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../User/model");

const decodeToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization
      ? String(req.headers.authorization).replace("Bearer ", "")
      : null;
    if (!accessToken) {
      const error = new Error("akses token di butuhkan");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    const accessTokenPayload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const user = await User.findById(accessTokenPayload.userId);
    if (!user) {
      const error = new Error("user tidak terdaftar");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = decodeToken;
