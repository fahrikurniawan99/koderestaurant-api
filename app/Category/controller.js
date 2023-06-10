const Category = require("./model");

const getAllCategory = async (req, res, next) => {
  try {
    const count = await Category.find().count();
    const categories = await Category.find();
    return res.status(200).json({
      data: categories,
      meta: { count },
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "kategori tidak di temukan",
      });
    }
    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const payload = req.body;
    const newCategory = new Category({
      name: payload.name,
    });
    await newCategory.save();
    return res.status(201).json({
      message: "kategori suksses di tambahkan",
      data: {
        name: payload.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndRemove(req.params?.id);
    return res.status(200).json({ message: "kategori sukses di hapus" });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = await Category.findById(req.params?.id);
    if (!category) {
      return res.status(404).json({
        message: "kategori tidak di temukan",
      });
    }
    const newCategory = await Category.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
      }
    );
    product = newCategory;
    return res.status(200).json({
      message: "kategori sukses di update",
      data: {
        name: product.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
