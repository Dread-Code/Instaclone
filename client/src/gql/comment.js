import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      comment
      createdAt
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($id: ID) {
    getComments(id: $id) {
      idUser {
        username
        avatar
        name
      }
      comment
      createdAt
    }
  }
`;

export const WS_GET_COMMENTS = gql`
  subscription newComment($id: ID) {
    newComment(id: $id) {
      idUser {
        username
        avatar
        name
      }
      comment
      createdAt
      idPublication
    }
  }
`;
