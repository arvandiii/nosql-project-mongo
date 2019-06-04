const requireAuth = func => {
  return (context, params) => {
    if (!context.user) {
      throw new Error("function requires authentication");
    }
    return func(context, params);
  };
};

module.exports = requireAuth;
