const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
console.log(Object.keys(resolvers));
module.exports = { typeDefs, resolvers };
