const { User } = require("../models");

const resolvers = {
  Query: {
    // get use by username
    user: async () => {
      return User.find({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
  },
};

module.export = resolvers;
