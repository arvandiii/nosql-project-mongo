const mongo = require("../utils/mongo");
const _ = require("underscore");
const Question = mongo.model("Question");
const QuestionLabel = mongo.model("QuestionLabel");

const getQuestionsBasedOnLabel = async (labelIds, skip, limit) => {
  const questionLabels = await QuestionLabel.find({
    labelId: { $in: labelIds }
  });
  const questions = await Question.find({
    _id: { $in: _.map(questionLabels, ql => ql.questionId) }
  })
    .skip(skip)
    .limit(limit);
  return questions;
};

const answerPage = async (ctx, params) => {
  const { skillIds, interestIds } = ctx.user;
  const { skip, limit } = params;
  return {
    questionsBasedOnInterests: await getQuestionsBasedOnLabel(
      interestIds,
      skip || 5,
      limit || 5
    ),
    questionsBasedOnSkills: await getQuestionsBasedOnLabel(
      skillIds,
      skip || 5,
      limit || 5
    )
  };
};

module.exports = answerPage;
