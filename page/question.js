const mongo = require("../utils/mongo");
const Promise = require("bluebird");

const Answer = mongo.model("Answer");
const Question = mongo.model("Question");
const Comment = mongo.model("Comment");
const Vote = mongo.model("Vote");

const getCommentsRecursive = async ({ objId }) => {
  const comments = await Comment.find({ replyTo: objId });
  return Promise.map(comments, async comment => {
    return {
      comment,
      comments: getCommentsRecursive({ objId: comment._id })
    };
  });
};

const getAnswers = async ({ questionId }) => {
  const answers = await Answer.find({ questionId });
  return Promise.map(answers, async answer => {
    return {
      answer,
      votes: {
        up: await Vote.count({ questionId, value: "up" }),
        down: await Vote.count({ questionId, value: "down" }),
        sum:
          (await Vote.count({ questionId, value: "up" })) -
          (await Vote.count({ questionId, value: "down" }))
      },
      comments: await getCommentsRecursive({ objId: answer._id })
    };
  });
};

const questionPage = async (ctx, params) => {
  const { questionId } = params;
  const question = await Question.findOne({ _id: questionId });
  const answers = getAnswers({ questionId });
  return { question, answers };
};

module.exports = questionPage;
