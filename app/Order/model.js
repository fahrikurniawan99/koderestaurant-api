const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const Invoice = require("../Invoice/model");

const OrderSchema = new Schema(
  {
    deliveryFee: {
      type: Number,
      default: 0,
    },
    deliveryAddress: {
      province: { type: String, required: [true, "silahkan isi provinsi"] },
      regency: {
        type: String,
        required: [true, "silahkan isi kota / kabupaten"],
      },
      district: { type: String, required: [true, "silahkan isi kecamatan"] },
      village: {
        type: String,
        required: [true, "silahkan isi desa / kelurahan"],
      },
    },
    totalPayment: {
      type: Number,
      required: [true, "silahkan isi total pembayaran"],
    },
    totalItem: {
      type: Number,
      required: [true, "silahkan isi total item"],
    },
    orderId: {
      type: String,
      required: [true, "silahkan isi order id"],
    },
    status: {
      type: String,
      enum: ["Sukses", "Di kirim", "Menunggu pembayaran"],
      default: "Sukses",
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = model("Order", OrderSchema);
