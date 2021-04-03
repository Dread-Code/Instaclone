import { gql } from '@apollo/client'

export const IS_FOLLOW = gql`
    query isFollow($username: String!){
        isFollow(username: $username)
    }
`


export const FOLLOW = gql`
    mutation follow($username: String!){
        follow(username: $username)
    }
`

export const UNFOLLOW = gql`
    mutation unFollow($username: String!){
        unFollow(username: $username)
    }
`
export const GET_FOLLOWERS = gql`
    query getFollowers($username: String!){
        getFollowers(username: $username){
            followers{
                id
                name
                username
                avatar
              }
              follow
        }
    }
`

export const WS_GET_FOLLOWERS = gql`
    subscription newFollower($username: String){
        newFollower(username:$username){
            followers{
                id
                name
                username
                avatar
              }
            follow
        }
    }
`

export const GET_FOLLOWS = gql`
    query getFollows($username: String! ){
        getFollows(username: $username){
            id
            name
            username
            avatar
        }
    }
`