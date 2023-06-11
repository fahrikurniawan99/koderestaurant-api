const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    qty: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = model("CartItem", CartItemSchema);
