const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const Vote = mongo.model("Vote");

const mapValue = { up: 1, down: -1 };

const vote = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const { value, questionId } = params;
  await Vote.findOneAndUpdate(
    { userId, questionId },
    { $set: { value: mapValue[value] } },
    { upsert: true }
  );
  return {};
};

module.exports = requireAuth(
  validateParams(vote, {
    value: "string",
    questionId: "string"
  })
);
