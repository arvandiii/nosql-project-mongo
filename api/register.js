const mongo = require("../utils/mongo");
const hash = require("../utils/hash");
const validateParams = require("../utils/validateParams");

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
  await User.create({ username, email, passwordHash, skills, interests });
  return {};
};

module.exports = validateParams(register, {
  username: "string",
  email: "string",
  password: "string",
  interests: "object",
  skills: "object"
});
