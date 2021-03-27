import React from 'react'
import { size } from 'lodash'
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS } from '../../../../gql/follow'

import "./Followers.scss"

export default function Followers({ username }) {

    const { data: dataFollowers, loading: loadingFollowers } = useQuery(GET_FOLLOWERS, { 
        variables: { username }
    })

    if(loadingFollowers) return null

    return (
        <div className="followers">
            <p> <span>**</span> Publicaciones</p>
            <p className="link"><span>{size(dataFollowers.getFollowers)}</span> Seguidores</p>
            <p className="link"><span>**</span> Seguidos</p>
        </div>
    )
} 
