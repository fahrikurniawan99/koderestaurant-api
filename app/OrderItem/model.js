const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    qty: {
      type: Number,
      default: 1,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      required: [true, "silahkan isi harga item"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = model("OrderItem", OrderItemSchema);
