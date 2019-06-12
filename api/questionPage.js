const mongo = require("../utils/mongo");
const Promise = require("bluebird");
const getCommentsRecursive = require("./utils/getCommentsRecursive");

const Answer = mongo.model("Answer");
const Question = mongo.model("Question");
const Vote = mongo.model("Vote");
const User = mongo.model("User");

const getAnswers = async ({ questionId }) => {
  const answers = await Answer.find({ questionId });
  return Promise.map(answers, async answer => {
    return {
      answer,
      votes: {
        up: await Vote.countDocuments({ questionId, value: "up" }),
        down: await Vote.countDocuments({ questionId, value: "down" }),
        sum:
          (await Vote.countDocuments({ questionId, value: "up" })) -
          (await Vote.countDocuments({ questionId, value: "down" }))
      },
      comments: await getCommentsRecursive({ objId: answer._id })
    };
  });
};

const questionPage = async (ctx, params) => {
  const { questionId } = params;
  const question = await Question.findOne({ _id: questionId });
  const answers = await getAnswers({ questionId });
  return {
    question,
    answers,
    user:
      question.type === "private"
        ? null
        : await User.findOne({ _id: question.userId })
  };
};

module.exports = questionPage;
