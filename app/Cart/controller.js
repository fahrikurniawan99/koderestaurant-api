const CartItem = require("../CartItem/model");

const updateCartItem = async (req, res, next) => {
  try {
    const payload = req.body;
    const items = JSON.parse(payload.items);
    await CartItem.deleteMany({ user: req.user.userId });
    await CartItem.bulkWrite(
      items.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user.userId,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );

    return res.status(200).json({
      message: "berhasil mengupdate keranjang",
    });
  } catch (error) {
    next(error);
  }
};

const getAllItem = async (req, res, next) => {
  try {
    const items = await CartItem.find({
      user: req.user.userId,
    }).populate("product");
    return res.status(200).json({
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateCartItem, getAllItem };
