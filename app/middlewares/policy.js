const { defineAbility } = require("@casl/ability");

const rules = {
  guest(userId, { can }) {
    can("read", "Product");
  },
  user(userId, { can }) {
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { userId });
    can("update", "User", { _id: userId });
    can("read", "Cart", { userId });
    can("update", "Cart", { userId });
    can("read", "Invoice", { userId });
  },
  admin(userId, { can }) {
    can("manage", "all");
  },
};

const policy = (action, subject) => (req, res, next) => {
  try {
    const user = req.user;
    const roleKey = Object.keys(rules);
    const isValidRole = roleKey.find((key) => key === user.role);
    const ability = defineAbility((can) =>
      rules[isValidRole](user.userId, { can })
    );
    if (!ability.can(action, subject)) {
      const error = new Error(
        `kamu tidak di izinkan untuk aksi ${action} ${subject}`
      );
      error.statusCode = 401;
      error.name = "unauthorized";
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = policy;
