import React from 'react'
import './UserNotFound.scss'
import { Link } from 'react-router-dom'

export default function UserNotFound() {
    return (
        <div className="user-not-found">
            <p>Usuario no Encontrado</p>
            <p>Es posible que el enlace que has seguido sea incorrecto o el usuario haya sido eliminado</p>
            <Link to="/">Regresar</Link>
        </div>
    )
}
