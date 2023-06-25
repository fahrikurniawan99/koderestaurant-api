const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const InvoiceSchema = new Schema({
  paymentMethod: {
    type: String,
    required: [true, "silahkan isi metode pembayaran"],
  },
  invoiceId: String,
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: Number,
      totalPrice: Number,
    },
  ],
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
