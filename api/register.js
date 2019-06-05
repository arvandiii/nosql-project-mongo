const mongo = require("../utils/mongo");
const hash = require("../utils/hash");
const validateParams = require("../utils/validateParams");
const Promise = require("bluebird");
const mergeLabelUtil = require("./utils/mergeLabel");
const _ = require("underscore")

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
  const skillIds = await Promise.map(skills, async skill => {
    const { label } = await mergeLabelUtil({ name: skill });
    return label._id;
  });
  const interestIds = await Promise.map(interests, async interest => {
    const { label } = await mergeLabelUtil({ name: interest });
    return label._id;
  });
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
