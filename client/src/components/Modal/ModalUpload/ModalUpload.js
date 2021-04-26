import React, { useCallback, useState } from 'react'
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { PUBLISH } from '../../../gql/publication'

import './ModalUpload.scss'

export default function ModalUpload({ showModal, setShowModal }) {

    const [fileUpload, setFileUpload] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [publish] = useMutation(PUBLISH)

    const onDrop = useCallback((acceptedFile) => {
        setFileUpload({
            type: 'image',
            file: acceptedFile[0],
            preview: URL.createObjectURL(acceptedFile[0])
        })
    })

    const  { getRootProps, getInputProps } = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const onCloseModal = () => {
        setIsLoading(false)
        setFileUpload(null)
        setShowModal(false)
    }

    const onPublish = async() => {
        try {
            setIsLoading(true)
            const { data } = await publish({
                variables: {
                    file: fileUpload.file
                }
            })
            if (!data.publish.status) {
                toast.warn("Error en la publicación")
                setIsLoading(false)
            }else{
                onCloseModal()
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Modal size="small" open={showModal} onClose={onCloseModal} className="modal-upload">
            <div {...getRootProps()} className="dropzone" style={ fileUpload && { border: 0}}>
                    {!fileUpload&&(
                        <>
                        <Icon name="cloud upload"/>
                        <p>Arrastra tu foto o video que quieras publicar</p>
                        </>
                    )}
                <input {...getInputProps()}/>
            </div>
            {fileUpload?.type === "image" && (
                <div className="image" style={{ backgroundImage: `url("${fileUpload.preview}")`}}></div>
            )}
            {fileUpload && (
                <Button className="btn-upload btn-action" onClick={onPublish}>Publicar</Button>
            )}
            {isLoading && (
                <Dimmer active className="publishing">
                    <Loader/>
                    <p>Publicando...</p>
                </Dimmer>
            )}
        </Modal>
    )
}
