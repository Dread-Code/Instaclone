import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query getPublications($username: String) {
    getPublications(username: $username) {
      publications {
        id
        idUser
        file
        typeFile
        createdAt
      }
      username
    }
  }
`;

export const WS_GET_PUBLICATIONS = gql`
  subscription newPublication($username: String!) {
    newPublication(username: $username) {
      publications {
        id
        idUser
        createdAt
        file
        typeFile
      }
      username
    }
  }
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
  query getPublicationsFollowed {
    getPublicationsFollowed {
      id
      idUser {
        name
        username
        avatar
      }
      file
      typeFile
      createdAt
    }
  }
`;
