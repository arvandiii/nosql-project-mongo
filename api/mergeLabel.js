const mongo = require("../utils/mongo");
const validateParams = require("../utils/validateParams");
const mergeLabelUtil = require("./utils/mergeLabel");

const Label = mongo.model("Label");

const mergeLabel = async (ctx, params) => {
  const { name } = params;
  const { label } = await mergeLabelUtil({ name });
  return { label };
};

module.exports = validateParams(mergeLabel, {
  name: "string"
});
