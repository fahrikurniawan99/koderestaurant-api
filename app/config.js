require("dotenv").config();

module.exports = {
  dbUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
};
