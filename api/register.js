const mongo = require("../utils/mongo");
const hash = require("../utils/hash");
const validateParams = require("../utils/validateParams");
const getLabelIdsByName = require("./utils/getLabelIdsByName");
const _ = require("underscore");

const User = mongo.model("User");

const register = async (ctx, params) => {
  const { username, email, password, skills, interests } = params;
  const passwordHash = hash(password);
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    throw new Error("username exist");
  }
  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    throw new Error("email exist");
  }
  const skillIds = await getLabelIdsByName(skills);
  const interestIds = await getLabelIdsByName(interests);
  await User.create({ username, email, passwordHash, skillIds, interestIds });
  return {};
};

module.exports = validateParams(register, {
  username: "string",
  email: "string",
  password: "string",
  interests: "object",
  skills: "object"
});
