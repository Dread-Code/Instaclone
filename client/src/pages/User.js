import React from 'react'
import { useParams } from 'react-router-dom'
import { size } from 'lodash'
import Profile from '../components/User/Profile'
import {  useQuery } from '@apollo/client'
import { GET_PUBLICATIONS } from '../gql/publication'
import Publications from '../components/User/Publications/Publications'

export default function User() {
    const { username } = useParams()

    const { data, loading } = useQuery(GET_PUBLICATIONS,{
        variables:{
            username
        }
    })
    
    if(loading) return null

    return (
        <>
            <Profile username = {username} totalPublications={size(data?.getPublications)}/>
            <Publications getPublications={data?.getPublications}/>
        </>
    )
}
