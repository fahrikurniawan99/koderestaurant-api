const User = require("../User/model");
const idGenerator = require("../libs/idGenerator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      customerId: idGenerator(5),
    });
    return res.status(201).json({
      message: "registrasi sukses",
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", async (error, user) => {
    try {
      if (!user) {
        const error = new Error("password atau email salah");
        error.statusCode = 400;
        return next(error);
      }
      if (error) {
        return next(error);
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
        }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET_KEY
      );

      await User.findByIdAndUpdate(user._id, {
        $push: { token: refreshToken },
      });

      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      return res.status(200).json({
        message: "login berhasil",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const refreshTokenPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    const userId = refreshTokenPayload.userId;
    const user = await User.findOne({
      _id: userId,
      token: { $in: [refreshToken] },
    });
    if (!user) {
      const error = new Error("refresh token kadaluarsa");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      }
    );
    return res.status(200).json({
      message: "akses token berhasil di buat",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const token = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    const user = await User.findOneAndUpdate(
      { _id: token.userId, token: { $in: [refreshToken] } },
      { $pull: { token: refreshToken } }
    );
    if (!user) {
      const error = new Error("refresh token kadaluarsa");
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    return res.status(200).json({ message: "logout berhasil" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    return res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
        customerId: user.customerId,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, refreshToken, profile };
