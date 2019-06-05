const validateParams = require("../utils/validateParams");
const getLabelByName = require("./utils/getLabelByName");

const mergeLabel = async (ctx, params) => {
  const { name } = params;
  const label = await getLabelByName({ name });
  return { label };
};

module.exports = validateParams(mergeLabel, {
  name: "string"
});
