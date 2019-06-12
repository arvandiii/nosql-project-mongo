const mongo = require("../utils/mongo");
const requireAuth = require("../utils/requireAuth");

const UserToken = mongo.model("UserToken");

const logout = async (ctx, params) => {
  await UserToken.deleteMany({ token: ctx.token });
  return {};
};

module.exports = requireAuth(logout);
