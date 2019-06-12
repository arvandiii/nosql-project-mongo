const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const Vote = mongo.model("Vote");

const vote = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const { value, answerId } = params;
  await Vote.findOneAndUpdate(
    { userId, answerId },
    { $set: { value } },
    { upsert: true }
  );
  return {};
};

module.exports = requireAuth(
  validateParams(vote, {
    value: "string",
    answerId: "string"
  })
);
