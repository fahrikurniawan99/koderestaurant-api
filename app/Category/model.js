const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "kategori minimal 3 karakter"],
      maxLength: [10, "kategori maksimal 10 karakter"],
      required: [true, "silahkan isi kategori"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
