const mongo = require("../utils/mongo");
const requireAuth = require("../utils/requireAuth");

const UserToken = mongo.model("UserToken");

const logout = async (ctx, params) => {
  await UserToken.remove({ token: ctx.token });
  return {};
};

module.exports = requireAuth(logout);
