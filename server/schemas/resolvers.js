const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signtoken } = require("../utils/auth");

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
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }
        const token = signToken(user);
        return { token, user };
      },
    },
  },
};

module.export = resolvers;
