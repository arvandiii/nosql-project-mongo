const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");

const Answer = mongo.model("Answer");
const Question = mongo.model("Question");

const answer = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const { text, questionId } = params;
  const question = await Question.findOne({ _id: questionId });
  const answerObj = await Answer.create({
    text,
    questionId,
    userId,
    mentionUserId: question.userId
  });
  return { answer: answerObj };
};

module.exports = requireAuth(
  validateParams(answer, {
    text: "string",
    questionId: "string"
  })
);
