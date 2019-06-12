const mongo = require("../utils/mongo");
const _ = require("underscore");
const Question = mongo.model("Question");
const Answer = mongo.model("Answer");

const profile = async (ctx, params) => {
  console.log("omadeeee injaaa");
  const questions = await Question.find({
    userId: ctx.user._id,
    type: "public"
  });
  const answers = await Answer.find({ userId: ctx.user._id });
  return {
    questions,
    answers,
    username: ctx.user.username,
    skillIds: ctx.user.skillIds,
    interestIds: ctx.user.interestIds,
    username: ctx.user.username,
    email: ctx.user.email
  };
};

module.exports = profile;
