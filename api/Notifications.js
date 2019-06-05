const validateParams = require("../utils/validateParams");
const getQuestionsUserMentioned = require("./utils/getQuestionsUserMentioned");

const getNotifications = async (ctx, params) => {
  return { mentions: await getQuestionsUserMentioned(ctx.user) };
};

module.exports = validateParams(getNotifications, {});
