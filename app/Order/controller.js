const Order = require("./model");
const Invoice = require("../Invoice/model");
const { nanoid } = require("nanoid");
const { Types } = require("mongoose");

const createOrder = async (req, res, next) => {
  try {
    const payload = req.body;
    const order = new Order({
      _id: new Types.ObjectId(),
      deliveryAddress:
        typeof payload.deliveryAddress !== "string"
          ? payload.deliveryAddress
          : JSON.parse(payload.deliveryAddress),
      orderId: nanoid(7),
      totalPayment: payload.totalPayment,
      user: req.user.userId,
      totalItem: payload.totalItem,
    });
    const invoice = await Invoice.create({
      user: req.user.userId,
      order: order._id,
      paymentMethod: payload.paymentMethod,
      items: payload.items,
    });
    order.invoice = invoice._id;
    await order.save();
    return res.status(201).json({
      message: "Pemesanan berhasil",
      data: {
        redirect: invoice._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    let condition = {};
    if (req.query.startDate && req.query.endDate) {
      const startDate = new Date(req.query.startDate);
      startDate.setHours(0, 0, 0);
      const endDate = new Date(req.query.endDate);
      endDate.setHours(23, 59, 59);
      condition = {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    }
    const orders = await Order.find({
      user: req.user.userId,
      ...condition,
    })
      .select("-_id")
      .populate("invoice");
    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
};
