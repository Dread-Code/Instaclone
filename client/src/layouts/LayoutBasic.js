import React from 'react'
import { Container } from 'semantic-ui-react'

export default function LayoutBasic({ children }) {
    return (
        <>
        <h1>Header</h1>
        <Container className="layout-basic">
            {children}
        </Container>
        </>
    )
}
