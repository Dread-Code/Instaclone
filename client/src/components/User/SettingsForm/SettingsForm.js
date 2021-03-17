import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import useAuth from '../../../hooks/useAuth'
import "./SettingsForm.scss"
import PasswordForm from '../PasswordForm'
import EmailForm from '../EmailForm/EmailForm'

export default function SettingsForm({ setShowModal, setTitleModal, setChildrenModal, getUser, refetch }) {

    const history = useHistory()
    const client = useApolloClient()
    const { logout } = useAuth()

    const onChangePassword = () => {
        setTitleModal("Cambiar tu contraseña")
        setChildrenModal(<PasswordForm logout={ onLogout }/>)
    }

    const onChangeEmail = () => {
        setTitleModal("Cambiar email")
        setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch}/>)
    }

    const onLogout = () => {
        client.clearStore()
        logout()
        history.push("/")
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button onClick={ onChangeEmail}>Cambiar email</Button>
            <Button>Descripción</Button>
            <Button>Sitio web</Button>
            <Button onClick={onLogout}>Cerrar sesion</Button>
            <Button onClick={ () => setShowModal(false)}>Cancelar</Button>

        </div>
    )
}
