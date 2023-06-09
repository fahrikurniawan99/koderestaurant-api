const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "nama produk minimal 3 karakter"],
      required: [true, "silahkan isi nama produk"],
    },
    description: {
      type: String,
      maxLength: [1000, "deskripsi maksimal 1000 karakter"],
      minLength: [10, "harga produk minimal 10 karakter"],
      required: [true, "silahkan isi deskripsi produk"],
    },
    price: {
      type: Number,
      required: [true, "silahkan isi harga produk"],
    },
    image_url: { type: String, required: [true, "silahkan isi gambar produk"] },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
