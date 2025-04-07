import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const GET_PRODUCT: DocumentNode = gql`
  query GetProducts($id: ID!) {
    Product(id: $id) {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      model_code
      colour
      img_url
    }
  }
`;
