if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const userUrl = process.env.USER_SERVICE_URL || "http://localhost:4000";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.PORTREDIS, process.env.REDIS)

const typeDefs = `#graphql

  type User {
    _id: ID!
    username: String,
    address: String,
    email: String!,
    phoneNumber: String,
  }

  input addUser {
    username: String,
    address: String,
    email: String!,
    phoneNumber: String,
    password: String!,
  }


  type postResult {
    acknowledged: Boolean!,
    insertedId: String!
  }

  type BackEndResult {
    message: String
  }

  type Query {  
    users: [User],
    user(id: String!): User,
  }

  type Mutation {
    addUser(newUser: addUser!): postResult,
    deleteUser(id: String!): BackEndResult,
  }
`;

const resolvers = {
    Query: {
        users: async (request, response, next) => {
            try {

                // We will try to use cache before query
                let userCache = await redis.get("userCache");

                if (userCache) {
                    let userResult = JSON.parse(userCache);
                    return userResult
                }

                const { data } = await axios.get(`${userUrl}`);

                redis.set("userCache", JSON.stringify(data));

                return data;

            } catch (error) {
                console.log(error)
            }

        },
        user: async (_, { id }) => {

            try {
                const { data } = await axios.get(`${userUrl}/${id}`);

                console.log(data);

                return data;
            } catch (error) {
                console.log(error);

            }


        },
    },
    Mutation: {
        addUser: async (_, { newUser }) => {
            try {
                // console.log(newUser);
                const { data } = await axios.post(`${userUrl}`, newUser);

                console.log(data);

                redis.del("userCache")

                return data;

            } catch (error) {
                console.log(error.message);
                return error
            }

        },
        deleteUser: async (_, { id }) => {

            try {

                console.log(id);

                const { data } = await axios.delete(`${userUrl}/${id}`);

                redis.del("userCache")

                return data;
            } catch (error) {
                console.log(error);
            }

        }

    },
};

module.exports = {
    typeDefs,
    resolvers
}
