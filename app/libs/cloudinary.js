const cloudinary = require("cloudinary");
require("dotenv").config();

const config = {
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.v2.config(config);

module.exports = cloudinary;
