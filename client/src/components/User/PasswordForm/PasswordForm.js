import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import "./PasswordForm.scss"

export default function PaswordForm({ logout }) {

    const [ updateUSer ] = useMutation(UPDATE_USER)

    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formData) => {
            try {
                const { data:{ updateUser } } =  await updateUSer({
                    variables: { 
                        input: {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword
                        }
                    }
                })
                console.log(updateUser)
                if (!updateUser){
                    toast.error("Error al cambiar la contraseña")
                } else {
                    logout()
                }
            } catch (error) {
                toast.error("Error al cambiar la contraseña")
            }
        }
    })

    return (
        <Form className="password-form" onSubmit={handleSubmit}>
            <Form.Input
                type="password"
                placeholder="Contraseña Actual"
                name="currentPassword" 
                value={values.currentPassword}
                onChange={handleChange}
                error={errors.currentPassword && true}
            />
            <Form.Input 
                type="password"
                placeholder="Nueva Contraseña" 
                name="newPassword" 
                value={values.newPassword}
                onChange={handleChange}
                error={errors.newPassword && true}
            />
            <Form.Input
                type="password"
                placeholder="Repetir Nueva Contraseña" 
                name="repeatNewPassword" 
                value={values.repeatNewPassword}
                onChange={handleChange}
                error={errors.repeatNewPassword && true}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    }
}
