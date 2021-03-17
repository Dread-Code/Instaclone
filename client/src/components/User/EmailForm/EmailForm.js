import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import "./EmailForm.scss"

export default function EmailForm({ currentEmail, setShowModal, refetch }) {

    const [ updateUser ] = useMutation(UPDATE_USER)


    const { handleSubmit, values: { email }, handleChange, errors } = useFormik({
       initialValues: { 
           email: currentEmail || ""
       },
       validationSchema: Yup.object({
           email: Yup.string().email().required()
       }),
       onSubmit: async ({ email }) => {
           try {
               const { data } = await updateUser({
                   variables: {
                       input: { 
                           email
                       }
                   }
               })
                if (!data.updateUser) {
                    toast.error("Error al actualizar email")
                    }else{
                            toast.success("Email actualizado con exito")
                    refetch();
                    setShowModal(false)
               }
           } catch (error) {
            toast.error("Error al actualizar email")
           }
       }
    })
    return (
        <Form className="email-form" onSubmit={handleSubmit}>
            <Form.Input
            placeholder="Escribe tu nuevo email"
            name="email"
            value={ email }
            onChange={handleChange}
            error={ errors.email && true }
            />
            <Button type="submit" className="btn-submit">
                Actualizar
            </Button>
        </Form>
    )
}
