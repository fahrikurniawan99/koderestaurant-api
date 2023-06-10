const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "tag minimal 3 karakter"],
      maxLength: [10, "tag maksimal 10 karakter"],
      required: [true, "silahkan isi tag"],
    },
  },
  { timestamps: true }
);

module.exports = model("Tag", TagSchema);
