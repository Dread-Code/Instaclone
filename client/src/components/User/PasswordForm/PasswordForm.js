import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useForm, useFormik } from 'formik'
import * as Yup from 'yup'
import "./PasswordForm.scss"

export default function PaswordForm() {

    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formData) => {
            console.log("FOrmulario enviado")
            console.log(formData)
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
