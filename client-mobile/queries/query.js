import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query ExampleQuery {
  products {
    id
    name
    slug
    description
    mainImg
    price
    categoryId
    Category {
      id
      name
    }
    authorId
    Author {
      _id
      username
      address
      email
      phoneNumber
    }
    Images {
      id
      imgUrl
      productId
    }
  }
}
    `;

export const DETAIL_PRODUCT = gql`
query Products($productId: Int!) {
  product(productId: $productId) {
    id
    name
    slug
    description
    mainImg
    price
    categoryId
    Category {
      id
      name
    }
    authorId
    Author {
      _id
      username
      address
      email
      phoneNumber
    }
    Images {
      id
      imgUrl
      productId
    }
  }
}
`