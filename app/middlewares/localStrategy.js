const User = require("../User/model");
const bcrypt = require("bcrypt");
const passportLocal = require("passport-local").Strategy;

const LocalStrategy = new passportLocal(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("password atau email salah");
        error.statusCode = 400;
        return done(error, null);
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        return done(null, {
          _id: user._id,
          email: user.email,
          role: user.role,
          customerId: user.customerId,
        });
      }
      const error = new Error("password atau email salah");
      error.statusCode = 400;
      done(error, null);
    } catch (error) {
      done(error, null);
    }
  }
);

module.exports = LocalStrategy;
