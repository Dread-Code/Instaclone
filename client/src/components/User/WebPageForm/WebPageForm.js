import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import "./WebPageForm.scss"

export default function WebPageForm({ currentSiteWeb, refetch, setShowModal }) {

    const [updateUser] = useMutation(UPDATE_USER, {})

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues:{ 
            siteWeb: currentSiteWeb || ''
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required()
        }),
        onSubmit:async (data2) => {
            try {
                const { data } = await updateUser({
                    variables: {
                        input:data2
                    }
                })
                if (!data.updateUser) {
                    toast.error("Error al actualizar el sitio web")
                } else {
                    toast.success("Sitio web actualizado con exito")
                    setShowModal(false)
                    refetch()
                }
            } catch (error) {
                toast.error("Error al actualizar el sitio web")
    
            }
            
        }
    })

    return (
        <Form className="webpage-form" onSubmit={handleSubmit}>
            <Form.Input
                placeholder="Sitio web"
                value={values.siteWeb}
                name="siteWeb"
                className={errors.siteWeb && "error"}
                onChange={handleChange}
            />
            <Button className="btn-submit" type="submit">Actualizar</Button>
        </Form>
    )
}
