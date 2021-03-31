import React, { useEffect, useState, useRef } from 'react'
import { set, size } from 'lodash'
import { useQuery, useSubscription,  useApolloClient } from '@apollo/client'
import { GET_FOLLOWERS, WS_GET_FOLLOWERS } from '../../../../gql/follow'
import ModalBasic from '../../../Modal/ModalBasic'
import "./Followers.scss"

export default function Followers({ username }) {

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

    const { data, loading, error } = useSubscription(WS_GET_FOLLOWERS,{
        variables: { username }
    })
  
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            setFollowers(dataFollowers?.getFollowers?.followers)    
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
            <div>
                <h3>Followers</h3>
            </div>
        )
    }

    if (loadingFollowers) return null
    
    return (
        <>
        <div className="followers">
            <p> <span>**</span> Publicaciones</p>
            <p className="link" onClick={openFollowers}><span>{size(followers)}</span> Seguidores</p>
            <p className="link"><span>**</span> Seguidos</p>
        </div>
        <ModalBasic show={ showModal } setShow={ setShowModal } title={ tittleModal } children={ childrenModal }/>
        </>
    )
} 