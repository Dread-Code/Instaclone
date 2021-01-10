import React, { useState } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../gql/user'
import ImageNotFound from '../../assets/png/avatar.png'
import './Profile.scss' 
import UserNotFound from '../UserNotFound'
import ModalBasic from '../Modal/ModalBasic'
import AvatarForm from '../User/AvatarForm/AvatarForm'

export default function Profile({ username }) {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)
    const { data, loading, error } = useQuery(GET_USER, { 
        variables: { username }
    });
    if (loading) return null
    if(error) return <UserNotFound/>
    const { name, siteWeb, description } = data.getUser
    console.log(data.getUser)

    const handlerModal = (type) => {

        switch (type) {
            case "avatar":
                setTitleModal("Cambiar Foto de Perfil")
                setShowModal(true)  
                setChildrenModal(<AvatarForm/>)
                break
            
            default:
                break
        }

    }
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ImageNotFound} avatar onClick={()=> handlerModal("avatar")} />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>Header Profile</div>
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
