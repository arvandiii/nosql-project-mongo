const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");

const User = mongo.model("User");

const mergeLabel = async (ctx, params) => {
  const { name } = params;
  let label = await User.findOne({ name });
  if (!label) {
    label = await User.create({ name });
  }
  return { label };
};

module.exports = validateParams(mergeLabel, {
  name: "string"
});
