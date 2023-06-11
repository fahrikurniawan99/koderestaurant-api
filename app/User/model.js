const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "nama minimal 3 karakter"],
      maxLength: [100, "nama maksimal 100 karakter"],
      required: [true, "silahkan isi nama "],
    },
    customerId: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "silahkan isi email"],
      unique: [true, "email sudah terdaftar"],
    },
    password: {
      type: String,
      required: [true, "silahkan isi password"],
      minLength: [5, "password minimal 3 karakter"],
      maxLength: [30, "password maksimal 30 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

UserSchema.path("email").validate(
  function (value) {
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return EMAIL_REGEX.test(value);
  },
  (attr) => `email tidak tidak valid`
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = model("User", UserSchema);
