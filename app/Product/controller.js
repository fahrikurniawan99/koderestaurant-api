const Product = require("./model");
const Category = require("../Category/model");
const Tag = require("../Tag/model");
const fs = require("fs");
const os = require("os");
const path = require("path");
const cloudinary = require("../libs/cloudinary");

const getAllProduct = async (req, res, next) => {
  let page = req.query.page ?? 0;
  let limit = req.query.limit ?? 6;
  let search = req.query.search ?? "";
  let categorySearch = req.query.category ?? "";
  let tagsSearch = req.query.tags ?? [];
  let filter = {};
  if (search) {
    filter = { ...filter, name: { $regex: search, $options: "i" } };
  }
  if (categorySearch) {
    let category = await Category.findOne({ name: categorySearch });
    if (!category) {
      return res.status(200).json({
        data: [],
        meta: { count: 0, page, limit },
      });
    }
    filter = { ...filter, category: category._id };
  }
  if (tagsSearch.length > 0) {
    let tags = await Tag.find({ name: { $in: tagsSearch } });
    if (!tags.length) {
      return res.status(200).json({
        data: [],
        meta: { count: 0, page, limit },
      });
    }
    filter = { ...filter, tags: { $in: tags.map((item) => item._id) } };
  }
  try {
    const count = await Product.find().count(filter);
    const products = await Product.find(filter)
      .skip(page)
      .limit(limit)
      .populate("category", {
        name: true,
      })
      .populate("tags", { name: true });
    return res.status(200).json({
      data: products,
      meta: { count, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", { name: true })
      .populate("tags", { name: true });
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
    let payload = req.body;
    if (payload.category) {
      let category = await Category.findOne({ name: payload.category });
      if (!category) {
        return res.status(404).json({
          message: "category tidak di temukan",
        });
      }
      payload = { ...payload, category: category._id };
    }
    if (payload.tags) {
      let tags = await Tag.find({
        name: {
          $in: payload.tags,
        },
      });
      if (!tags.length > 0) {
        return res.status(404).json({
          message: "tags tidak di temukan",
        });
      }
      payload = { ...payload, tags: tags.map((item) => item._id) };
    }
    const uploaded = await cloudinary.v2.uploader.upload(
      path.join(os.tmpdir(), req.file.originalname),
      {
        folder: "rekash",
      }
    );
    fs.unlinkSync(path.join(os.tmpdir(), req?.file?.originalname));
    const image = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      placeholder: path.basename(
        req.file.originalname,
        path.extname(req.file.originalname)
      ),
    };
    const product = await Product.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      category: payload.category,
      tags: payload.tags,
      image,
    });
    return res.status(201).json({
      message: "product sukses di tambahkan",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: req.body.category,
        tags: req.body.tags,
        image,
      },
    });
  } catch (error) {
    fs.unlinkSync(path.join(os.tmpdir(), req?.file?.originalname));
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params?.id);
    await cloudinary.v2.uploader.destroy(product.image.public_id);
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
    if (payload.category) {
      let category = await Category.findOne({ name: payload.category });
      if (!category) {
        return res.status(404).json({
          message: "category tidak di temukan",
        });
      }
      payload = { ...payload, category: category._id };
    }
    if (payload.tags) {
      let tags = await Tag.find({
        name: {
          $in: payload.tags,
        },
      });
      if (!tags.length > 0) {
        return res.status(404).json({
          message: "tags tidak di temukan",
        });
      }
      payload = { ...payload, tags: tags.map((item) => item._id) };
    }
    if (req.file) {
      await cloudinary.v2.uploader.destroy(product.image.public_id);
      const uploaded = await cloudinary.v2.uploader.upload(
        path.join(os.tmpdir(), req.file.originalname),
        {
          folder: "rekash",
        }
      );
      const image = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
        placeholder: path.basename(
          req.file.originalname,
          path.extname(req.file.originalname)
        ),
      };
      fs.unlinkSync(path.join(os.tmpdir(), req.file.originalname));
      payload = { ...payload, image };
    }
    const newProduct = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    })
      .populate("category")
      .populate("tags");
    product = newProduct;
    return res.status(200).json({
      message: "produk sukses di update",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        tags: product.tags,
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
