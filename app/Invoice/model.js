const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const InvoiceSchema = new Schema({
  subTotal: {
    type: Number,
    required: [true, "silahkan isi sub total"],
  },
  total: {
    type: Number,
    required: [true, "silahkan isi harga total"],
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Invoice", InvoiceSchema);
