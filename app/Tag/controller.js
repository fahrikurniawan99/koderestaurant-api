const Tag = require("./model");

const getAllTag = async (req, res, next) => {
  try {
    const count = await Tag.find().count();
    const tags = await Tag.find();
    return res.status(200).json({
      data: tags,
      meta: { count },
    });
  } catch (error) {
    next(error);
  }
};

const getTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({
        message: "tag tidak di temukan",
      });
    }
    return res.status(200).json({
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try {
    const payload = req.body;
    const newTag = new Tag({
      name: payload.name,
    });
    await newTag.save();
    return res.status(201).json({
      message: "tag sukses di tambahkan",
      data: {
        name: payload.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndRemove(req.params?.id);
    return res.status(200).json({ message: "tag sukses di hapus" });
  } catch (error) {
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = await Tag.findById(req.params?.id);
    if (!tag) {
      return res.status(404).json({
        message: "tag tidak di temukan",
      });
    }
    const newTag = await Tag.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    tag = newTag;
    return res.status(200).json({
      message: "tag sukses di update",
      data: {
        name: tag.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTag,
  getTag,
  createTag,
  deleteTag,
  updateTag,
};
