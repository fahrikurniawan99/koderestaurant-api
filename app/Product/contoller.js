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

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const newProduct = new Product({
      name: payload.name,
    });
    console.log(req.file);
    await newProduct.save();
    return res.status(200).json({
      message: "product created",
      data: {
        file: req.file,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message ?? "Internal server error",
      error,
    });
  }
};

module.exports = { getAllProduct, createProduct };
