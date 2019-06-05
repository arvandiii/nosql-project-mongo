const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const User = mongo.model("User");

const updateInfo = async (ctx, params) => {
  const { username, email, skills, interests } = params;
  const {
    user: { _id: userId }
  } = ctx;
  const query = { username, email };
  if (skills.length) {
    const skillIds = await Promise.map(skills, async skill => {
      const { label } = await mergeLabelUtil({ name: skill });
      return label._id;
    });
    Object.assign(query, { skillIds });
  }
  if (interestIds.length) {
    const interestIds = await Promise.map(interests, async interest => {
      const { label } = await mergeLabelUtil({ name: interest });
      return label._id;
    });
    Object.assign(query, { interestIds });
  }
  await User.findOneAndUpdate({ _id: userId }, { $set: query });
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
