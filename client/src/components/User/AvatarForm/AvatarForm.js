import React, { useCallback, useState }from 'react'
import { Button } from "semantic-ui-react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"
import { UPDATE_AVATAR, GET_USER } from "../../../gql/user"
import './AvatarForm.scss'


export default function AvatarForm({ setShowModal, auth }) {

    const [loading, setLoading] = useState(false)

    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        update(cache, { data:{ updateAvatar} }){
           const { getUser } = cache.readQuery({
               query: GET_USER,
               variables: { username: auth.username}
           })

           cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username},
                data: {
                    getUser: { 
                        ...getUser,
                        avatar: updateAvatar.urlAvatar
                    }
                }
           })
        }
    })

    const onDrop = useCallback( async (acceptedFile) => {
        const file = acceptedFile[0];

        try {
            setLoading(true)
            const { data } = await updateAvatar({ variables: { file } })
            if (!data.updateAvatar.status) {
                toast.warning("Error al actualizar el avatar")
                setLoading(false);
            }else {
                setLoading(false)
                setShowModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const { getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

    return (
        <div className="avatar-form">
            <Button  {...getRootProps()} loading={loading}>Cargar una Foto</Button>
            <Button>Eliminar Foto Actual</Button>
            <Button onClick={() =>setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()}/>
        </div>
    )
}
