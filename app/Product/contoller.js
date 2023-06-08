const Product = require("./model");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message ?? "Internal server error",
      error,
    });
  }
};

module.exports = { getAllProduct };
