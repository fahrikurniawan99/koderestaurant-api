const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "nama makanan minimal 3 karakter"],
      required: [true, "silahkan isi nama makanan"],
    },
    description: {
      type: String,
      minLength: [1000, "nama makanan minimal 1000 karakter"],
    },
    price: {
      type: Number,
      required: [true, "silahkan isi harga makanan"],
    },
    image_url: String,
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
