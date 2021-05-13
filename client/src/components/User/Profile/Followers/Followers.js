import React, { useEffect, useState, useRef } from 'react'
import { size } from 'lodash'
import { useQuery, useSubscription,  useApolloClient } from '@apollo/client'
import { GET_FOLLOWERS, WS_GET_FOLLOWERS, GET_FOLLOWS } from '../../../../gql/follow'
import ModalBasic from '../../../Modal/ModalBasic'
import "./Followers.scss"
import UsersList from '../../UsersList/UsersList'

export default function Followers({ username, totalPublications }) {

    const [followers, setFollowers] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [tittleModal, setTittleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)


    const client = useApolloClient()
    const isMounted = useRef(false)
    const { 
        data: dataFollowers,
        loading: loadingFollowers
    } = useQuery(GET_FOLLOWERS, {
        variables: { username }
    })

    const {
        data: dataFollows,
        loading: loadingFollows,
        refetch
    } = useQuery(GET_FOLLOWS, {
        variables: {
            username
        }
    })

    const { data } = useSubscription(WS_GET_FOLLOWERS,{
        variables: { username }
    })
  
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            setFollowers(dataFollowers?.getFollowers?.followers)
            refetch()

        }
        return () => {
            isMounted.current = false
        }
    }, [dataFollowers])

    useEffect(() =>{
        let followers = data?.newFollower
        if (followers) {
            setFollowers(followers?.followers)
            client.writeQuery({
                query: GET_FOLLOWERS,
                data: { 
                    getFollowers:{ 
                        ...followers
                    }
                },
                variables: {
                    username
                }
            })
        }
    }, [data])

    const openFollowers = () => {
        setTittleModal("Seguidores")
        setShowModal(true)
        setChildrenModal(
            <UsersList users={followers} setShowModal={setShowModal}/>
        )
    }

    const openFollows = () => {
        setTittleModal("Seguidos")
        setShowModal(true)
        setChildrenModal(
            <UsersList users={dataFollows.getFollows} setShowModal={setShowModal}/>
        )
    }

    if (loadingFollowers) return null
    if(loadingFollows) return null
    return (
        <>
        <div className="followers">
            <p> <span>{totalPublications}</span> Publicaciones</p>
            <p className="link" onClick={openFollowers}><span>{size(followers)}</span> Seguidores</p>
            <p className="link" onClick={openFollows}><span>{size(dataFollows.getFollows)}</span> Seguidos</p>
        </div>
        <ModalBasic show={ showModal } setShow={ setShowModal } title={ tittleModal } children={ childrenModal }/>
        </>
    )
} 
