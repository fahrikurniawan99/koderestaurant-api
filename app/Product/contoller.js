const Product = require("./model");
const fs = require("fs");

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "produk tidak di temukan",
      });
    }
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const image_url = `uploads/${req.file.originalname}`;
    const newProduct = new Product({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image_url,
    });
    await newProduct.save();
    return res.status(201).json({
      message: "product sukes di tambahkan",
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image_url,
      },
    });
  } catch (error) {
    fs.unlinkSync(`public/uploads/${req?.file?.originalname}`);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params?.id);
    fs.unlinkSync(`public/${product.image_url}`);
    return res.status(200).json({ message: "produk sukses di hapus" });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let payload = req.body;
    let product = await Product.findById(req.params?.id);
    if (!product) {
      return res.status(404).json({
        message: "produk tidak di temukan",
      });
    }
    if (req.file) {
      fs.unlinkSync(`public/${product.image_url}`);
      payload = { ...payload, image_url: `uploads/${req.file.originalname}` };
    }
    const newProduct = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    product = newProduct;
    return res.status(200).json({
      message: "produk sukses di update",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
