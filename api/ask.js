const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const Promise = require("bluebird");
const getLabelByName = require("./utils/getLabelByName");

const Question = mongo.model("Question");
const QuestionLabel = mongo.model("QuestionLabel");
const QuestionMention = mongo.model("QuestionMention");

const ask = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const { text, labels, mentionIds, questionType } = params;
  const question = await Question.create({ userId, text, type: questionType });
  await Promise.map(labels, async label => {
    const { _id: labelId } = await getLabelByName(label);
    await QuestionLabel.create({ questionId: question._id, labelId });
  });
  await Promise.map(mentionIds, async mentionId => {
    await QuestionMention.create({
      questionId: question._id,
      userId: mentionId
    });
  });
  return { question };
};

module.exports = validateParams(ask, {
  text: "string",
  labels: "object",
  mentionIds: "object",
  questionType: "string"
});
