const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const Invoice = require("../Invoice/model");

const OrderSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        "Menunggu pembayaran",
        "Sedang di kemas",
        "Sedang di kirim",
        "Sukses di kirim",
      ],
      default: "Sukses di kirim",
    },
    deliveryFee: {
      type: Number,
      required: [true, "silahkan isi biaya pengiriman"],
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItem: {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  },
  { timestamps: true }
);

OrderSchema.virtual("itemCount").get(function () {
  return this.orderItem.reduce((total, item) => total + Number(item.qty), 0);
});
OrderSchema.post("save", async function () {
  const subTotal = this.orderItem.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  const invoice = new Invoice({
    user: this.user,
    order: this._id,
    subTotal,
    total: Number(subTotal) + Number(this.deliveryFee),
  });
  await invoice.save();
});

module.exports = model("Order", OrderSchema);
