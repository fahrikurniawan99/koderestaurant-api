const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../User/model");

const decodeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? String(req.headers.authorization).replace("Bearer ", "")
      : null;
    if (!token) {
      const error = new Error("token di butuhkan");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await User.findOne({
      _id: tokenPayload.userId,
      token: { $in: [token] },
    });
    if (!user) {
      const error = new Error("token sudah kadaluarsa");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    req.token = token;
    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = decodeToken;
