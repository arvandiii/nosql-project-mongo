const mongo = require("../utils/mongo");
const _ = require("underscore");
const Question = mongo.model("Question");
const QuestionLabel = mongo.model("QuestionLabel");

const getQuestionsBasedOnLabel = async labelIds => {
  const questionLabels = await QuestionLabel.find({
    labelId: { $in: labelIds }
  });
  const questions = await Question.find({
    _id: { $in: _.map(questionLabels, ql => ql.questionId) }
  }).limit(5);
  return questions;
};

const answerPage = async (ctx, params) => {
  const { skillIds, interestIds } = ctx.user;
  return {
    questionsBasedOnInterests: await getQuestionsBasedOnLabel(interestIds),
    questionsBasedOnSkills: await getQuestionsBasedOnLabel(skillIds)
  };
};

module.exports = answerPage;
