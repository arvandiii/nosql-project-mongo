const mongo = require("../utils/mongo");
const Promise = require("bluebird");
const getCommentsRecursive = require("./utils/getCommentsRecursive");

const Answer = mongo.model("Answer");
const User = mongo.model("User");
const Question = mongo.model("Question");
const Vote = mongo.model("Vote");

const answerPage = async (ctx, params) => {
  const { answerId } = params;
  const answer = await Answer.findOne({ _id: answerId });
  const question = await Question.findOne({ _id: answer.questionId });
  const answerer = await User.findOne({ _id: answer.userId });
  const otherAnswers = await Answer.find({ userId: answer.userId });
  return {
    question,
    answer,
    votes: {
      up: await Vote.count({ questionId, value: "up" }),
      down: await Vote.count({ questionId, value: "down" }),
      sum:
        (await Vote.count({ questionId, value: "up" })) -
        (await Vote.count({ questionId, value: "down" }))
    },
    comments: await getCommentsRecursive({ objId: answer._id }),
    answerer,
    otherAnswers
  };
};

module.exports = answerPage;
