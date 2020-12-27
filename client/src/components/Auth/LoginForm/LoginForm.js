import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import "./LoginForm.scss"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../gql/user'
import { setToken, decodeToken } from '../../../utils/token'
import useAuth from '../../../hooks/useAuth'


export const LoginForm = () => {
    const [error, setError] = useState("")

    const [login] = useMutation(LOGIN)
    const { setUser } = useAuth()

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido")
                .required("El nombre de usuario es obligatorio"),
            password: Yup.string().required()
        }),
        onSubmit: async (formData) => {
            setError("")
            try {
                let { data } = await login({
                    variables:{
                        input:formData
                    }
                })
                const { token } = data.login
                setToken(token)
                setUser(decodeToken(token))
            } catch (e) {
                setError(e.message)
            }
        }
    })

    return (
        <>
           <h2 className="login-form-title">Hola de Nuevo</h2>
           <Form className="login-form" onSubmit={formik.handleSubmit}>
               <Form.Input
               type="text"
               placeholder="Email"
               name="email"
               onChange={formik.handleChange}
               error={formik.errors.email && true}
               />
               <Form.Input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={formik.handleChange}
                error={formik.errors.password && true}
               />
            <Button className="btn-submit" type="submit">Iniciar Sesión</Button>
            {error && <p className="submit-error">{error}</p>}
           </Form>
        </>
    )
}

const initialValues = () => {
    return {
        email: "",
        password: ""
    }
}
