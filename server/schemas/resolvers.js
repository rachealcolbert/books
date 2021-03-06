const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get user by username
    // user: async () => {
    //   return User.find({ username })
    //     .select("-__v -password")
    //     .populate("savedBooks");
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
        console.log(userData);
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log("addUser", args);
      const user = await User.create(args);
      const token = signToken(user);
      console.log({ token, user });
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
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const saveABook = await Book.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book._id } },
          { new: true }
        );
        return saveABook;
      }
      throw new AuthenticationError("You need to log in");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const deleteBook = await Book.findOneAndDelete(
          { _id: context.user._id },
          { $remove: { book: bookId } },
          { new: true }
        ).populate("savedBooks");

        return deleteBook;
      }
      throw new AuthenticationError("You need to log in");
    },
  },
};
console.log("!!!!!!", resolvers);
module.exports = resolvers;
