const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
});

module.exports = model("Product", ProductSchema);
