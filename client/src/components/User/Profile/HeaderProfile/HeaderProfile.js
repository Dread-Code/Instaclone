import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from '../../../../gql/follow'
import { Button } from "semantic-ui-react"
import "./HeaderProfile.scss"

export default function HeaderProfile({ username, auth, handlerModal }) {

    let { data, loading, refetch } = useQuery( IS_FOLLOW, {
        variables: {
            username: username
        }
    })

    const [follow] = useMutation(FOLLOW)
    const [unFollow] = useMutation(UNFOLLOW)


    const buttonFollow = () => {
        if (data.isFollow) {
            return (<Button className="btn-danger" onClick={onUnFollow}>Dejar de Seguir</Button>)
        } else {
            return (<Button className="btn-action" onClick={onFollow}>Seguir</Button>)
        }
    }

    const onUnFollow = async () => {
        try {
            await unFollow({
                variables:{ 
                    username
                }
            })
            refetch()
        } catch (error) {
            console.log(error)
        }
    }

    const onFollow = async () => {
        try {
            await follow({
                variables: {
                    username
                }
            })
            refetch()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="header-profile">
            <h2>{username}</h2>
            {
                username === auth.username ?
                (<Button onClick={ () =>handlerModal("settings")}>Ajustes</Button>) :
                (!loading && buttonFollow())
            }
        </div>
    )
}
