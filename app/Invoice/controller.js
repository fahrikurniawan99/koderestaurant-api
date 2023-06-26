const Invoice = require("./model");

const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("order")
      .populate({
        path: "items",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    return res.status(200).json({
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoice,
};
