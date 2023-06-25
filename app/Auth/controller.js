const User = require("../User/model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      customerId: nanoid(5),
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
      const token = jwt.sign(
        { userId: user._id },
        process.env.TOKEN_SECRET_KEY
      );

      await User.findByIdAndUpdate(user._id, {
        $push: { token: token },
      });

      return res.status(200).json({
        message: "login berhasil",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const logout = async (req, res, next) => {
  try {
    const token = req.token;
    await User.findOneAndUpdate({ $pull: { token: token } });
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

module.exports = { register, login, logout, profile };
