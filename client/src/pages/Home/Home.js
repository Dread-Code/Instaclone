import React from 'react'
import useAuth from '../../hooks/useAuth'
import './Home.scss'


export default function Home() {
    const auth = useAuth()
    return (
        <div>
            <h1>Estamos en la Home</h1>
        </div>
    )
}
