const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const {
  typeDefs: productTypeDefs,
  resolvers: productResolvers
} = require("./schema/product")

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers
} = require("./schema/user")

const server = new ApolloServer({
  typeDefs: [productTypeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
  introspection: true,
});

(async () => {
  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 8000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
