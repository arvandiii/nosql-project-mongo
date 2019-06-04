const undescore = require("underscore");

const requireAuth = (func, validation) => {
  return (context, params) => {
    _.mapObject(validation, (val, key) => {
      if (!params[key]) {
        throw new Error(`${key} not exits`);
      }
      if (typeof params[key] != val) {
        throw new Error(`${key} not exits`);
      }
    });
    return func(context, params);
  };
};

module.exports = requireAuth;
