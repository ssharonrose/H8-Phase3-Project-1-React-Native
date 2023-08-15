if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const productUrl = process.env.PRODUCT_SERVICE_URL || "http://localhost:3000";
const userUrl = process.env.USER_SERVICE_URL || "http://localhost:4000";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.PORTREDIS, process.env.REDIS)

const typeDefs = `#graphql
  type Product {
    id: ID!,
    name: String!,
    slug: String,
    description: String!,
    mainImg: String!,
    price: Int!,
    categoryId: ID!,
    Category: Category,
    authorId: ID!,
    Author: User,
    Images: [Images]
  }

  input addProduct {
    name: String!,
    description: String!,
    mainImg: String!,
    price: Int!,
    categoryId: Int,
    authorId: String!,
    imgUrl1: String!,
    imgUrl2: String!,
    imgUrl3: String!
  }

  input editProduct {
    name: String!,
    description: String!,
    mainImg: String!,
    price: Int!,
    categoryId: Int!,
  }

  type Category {
    id: ID!
    name: String
  }

  type User {
    _id: ID!
    username: String,
    address: String,
    email: String!,
    phoneNumber: String
  }

  type Images {
    id: ID!
    imgUrl: String!,
    productId: String!
  }

  type BackEndResult {
    message: String
  }


  type PostResult {
    created: PostResultCreated,
    images: [Images]
  }

  type EditResult {
    message: String,
  }

  type PostResultCreated {
        id: ID!,
        name: String!,
        slug: String,
        description: String!,
        price: Int!,
        mainImg: String!,
        categoryId: ID!,
        authorId: ID!,
        updatedAt: String,
        createdAt: String
  }

  type Query {  
    products: [Product],
    product(productId: Int!): Product,
  }

  type Mutation {
    addProduct(newProduct: addProduct!): PostResult,
    deleteProduct(id: Int!): BackEndResult,
    editProduct(editProduct: editProduct!, id: Int! ): EditResult
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      try {

        // We will try to use cache before query
        let productsCache = await redis.get("productsCache");

        if (productsCache) {
          let productsResult = JSON.parse(productsCache);
          return productsResult
        }

        const { data } = await axios.get(`${productUrl}/user/products`);

        redis.set("productsCache", JSON.stringify(data));

        return data;

      } catch (error) {
        console.log(error)
      }
      // Jangan lupa bila nanti ada cache, gunakan strategi cache (redis)
      // di sini yah

    },
    product: async (_, { productId }) => {

      try {

        // console.log(productId);
        const { data } = await axios.get(`${productUrl}/user/products/${+productId}`);

        // console.log(data);

        const user = await axios.get(`${userUrl}/users/${data.authorId}`)

        console.log(user);

        data.Author = user.data

        console.log(data);

        return data;
      } catch (error) {
        // console.log(error);

      }


    },
  },
  Mutation: {
    addProduct: async (_, { newProduct }) => {
      try {
        // console.log(newProduct);
        const { data } = await axios.post(`${productUrl}/user/products`, newProduct);

        console.log(data);

        redis.del("productsCache")

        return data;
      } catch (error) {
        console.log(error.message);
        return error
      }

    },
    editProduct: async (_, { editProduct, id }) => {

      try {

        console.log(editProduct);
        console.log(id);

        const { data } = await axios.put(`${productUrl}/user/products/${+id}`, editProduct);

        console.log(data)
        redis.del("productsCache")

        return data;
      } catch (error) {
        console.log(error);
      }

    },
    deleteProduct: async (_, { id }) => {

      try {

        console.log(id);

        const { data } = await axios.delete(`${productUrl}/user/products/${+id}`);

        redis.del("productsCache")

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
