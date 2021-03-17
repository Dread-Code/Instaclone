import React from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER, GET_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import './DescriptionForm.scss'

export default function DescriptionForm({ currentDescription, refetch, setShowModal }) {

    const [ updateUser ] = useMutation(UPDATE_USER, {})

    const { values, handleSubmit, handleChange, errors } = useFormik({
        initialValues: { 
            description: currentDescription
        },
        validationSchema: Yup.object({
            description: Yup.string().required()
        }),
        onSubmit: async ({description}) => {
            try {
                const { data } = await updateUser({
                    variables: {
                        input: { 
                            description
                        }
                    }
                })
                if (!data.updateUser) {
                    toast.error("Error al actualizar la descripción ")
                } else {
                    setShowModal(false)
                    refetch()
                    toast.success("Descripción actualizada con exito")
                }
                
                
            } catch (error) {
                toast.error("Error al actualizar la descripción ")
            }
        }
    })

    return (
        <Form className="description-form" onSubmit={handleSubmit}>
            <TextArea 
                placeholder="Nueva descripción" 
                name="description" 
                value={values.description} 
                onChange={handleChange} 
                className={errors.description && "error"}
            />
            <Button className="btn-submit" type="submit">Actualizar</Button>
        </Form>
    )
}
