const validateParams = require("../utils/validateParams");
const getQuestionsUserMentioned = require("./utils/getQuestionsUserMentioned");
const requireAuth = require("../utils/requireAuth");

const notifications = async (ctx, params) => {
  return { mentions: await getQuestionsUserMentioned(ctx.user) };
};

module.exports = requireAuth(validateParams(notifications, {}));
