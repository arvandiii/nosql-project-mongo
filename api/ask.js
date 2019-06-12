const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const requireAuth = require("../utils/requireAuth");
const Promise = require("bluebird");
const getLabelByName = require("./utils/getLabelByName");

const Question = mongo.model("Question");
const User = mongo.model("User");
const QuestionLabel = mongo.model("QuestionLabel");
const QuestionMention = mongo.model("QuestionMention");

const ask = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  console.log("inja", ctx);
  const { text, labels, mentions, questionType } = params;
  const question = await Question.create({ userId, text, type: questionType });
  console.log("inja", question);
  await Promise.map(labels, async label => {
    console.log("inja label", label, await getLabelByName(label));

    const { _id: labelId } = await getLabelByName(label);
    await QuestionLabel.create({ questionId: question._id, labelId });
  });
  await Promise.map(mentions, async mention => {
    const { _id: userId } = await User.findOne({ username: mention });
    await QuestionMention.create({
      questionId: question._id,
      userId
    });
  });
  return { question };
};

module.exports = requireAuth(
  validateParams(ask, {
    text: "string",
    labels: "object",
    mentions: "object",
    questionType: "string"
  })
);
