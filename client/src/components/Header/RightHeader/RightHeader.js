import React, { useState } from 'react'
import { Icon, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import useAuth from '../../../hooks/useAuth'
import ImageNotFound from '../../../assets/png/avatar.png'
import './RightHeader.scss'
import ModalUpload from '../../Modal/ModalUpload/ModalUpload'

export default function RightHeader() {

    const [showModal, setShowModal] = useState(false)

    const { username } = useAuth().auth
    
    const { data, loading, eror } = useQuery(GET_USER,{
        variables: {username},
    })

    const handleShowModal = () => {
        setShowModal(true)
    }

    if(loading || eror) return null
    const { getUser } = data

    return (
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home"/>
                </Link>
                <Icon name="plus" onClick={handleShowModal}/>
                <Link to={`/${username}`} >
                    <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar/>
                </Link>
            </div>
            <ModalUpload showModal={showModal} setShowModal={setShowModal}/>
        </>
    )
}
