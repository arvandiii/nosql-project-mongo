const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const User = mongo.model("User");

const updateInfo = async (ctx, params) => {
  const { username, email, skills, interests } = params;
  const {
    user: { _id: userId }
  } = ctx;
  await User.findOneAndUpdate(
    { _id: userId },
    { $set: { username, email, skills, interests } }
  );
  return {};
};

module.exports = requireAuth(
  validateParams(updateInfo, {
    username: "string",
    email: "string",
    skills: "object",
    interests: "object"
  })
);
