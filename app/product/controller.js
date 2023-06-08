const create = (req, res, next) => {
  res.status(200).json({ message: "success create product" });
};

module.exports = { create };
