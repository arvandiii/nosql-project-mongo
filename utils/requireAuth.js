const requireAuth = func => {
  return async (context, params) => {
    if (!context.user) {
      throw new Error("function requires authentication");
    }
    return func(context, params);
  };
};

module.exports = requireAuth;
