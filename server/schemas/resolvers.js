const { User } = require("../models");

const resolvers = {
  Query: {
    // get use by username
    user: async () => {
      return User.find({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        return user;
      },
      login: async () => {},
    },
  },
};

module.export = resolvers;
