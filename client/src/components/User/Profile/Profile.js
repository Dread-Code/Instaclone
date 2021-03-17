import React, { useState } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import ImageNotFound from '../../../assets/png/avatar.png'
import './Profile.scss' 
import UserNotFound from '../../UserNotFound'
import ModalBasic from '../../Modal/ModalBasic'
import AvatarForm from '../AvatarForm/AvatarForm'
import userAuth from '../../../hooks/useAuth'
import HeaderProfile from './HeaderProfile/HeaderProfile'
import SettingsForm from '../SettingsForm/SettingsForm'

export default function Profile({ username }) {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)
    const { data, loading, error, refetch } = useQuery(GET_USER, { 
        variables: { username }
    });
    if (loading) return null
    if(error) return <UserNotFound/>
    const { auth } = userAuth() 
    const { name, siteWeb, description, avatar } = data.getUser
    console.log(username)
    console.log(auth)

    const handlerModal = (type) => {

        switch (type) {
            case "avatar":
                setTitleModal("Cambiar Foto de Perfil")
                setShowModal(true)  
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth}/>)
                break
            case "settings":
                setTitleModal("")
                setChildrenModal(
                <SettingsForm 
                setShowModal={setShowModal} 
                auth={auth} 
                setTitleModal={setTitleModal}
                setChildrenModal={setChildrenModal}
                getUser={data.getUser}
                refetch={refetch}
                />)
                setShowModal(true)
                break
            default:
                break
        }

    }
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={avatar ? avatar : ImageNotFound} avatar onClick={() => username === auth.username && handlerModal("avatar")} />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile username={username} auth={auth} handlerModal={handlerModal}/>
                    <div>Followers</div>
                    <div className="other"> 
                        <p className="name">{name}</p>
                        {siteWeb&& (
                            <a href={siteWeb} className="siteweb" target="_blank">
                                {siteWeb}
                            </a>
                        )}
                        {
                            description && (
                                <p className="description">{description}</p>
                            )
                        }
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    )
}
