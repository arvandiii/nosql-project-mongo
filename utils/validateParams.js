const _ = require("underscore");

const validateParams = (func, validation) => {
  return async (context, params) => {
    _.mapObject(validation, (val, key) => {
      if (!params[key]) {
        throw new Error(`${key} not provided`);
      }
      if (typeof params[key] != val) {
        throw new Error(`${key} type should be ${val}`);
      }
    });
    return func(context, params);
  };
};

module.exports = validateParams;
