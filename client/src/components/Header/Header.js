import React from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/png/instaclone.png'
import './Header.scss'
import RightHeader from './RightHeader/RightHeader'
import Search from './Search/Search'

export default function Header() {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                        <Image src={Logo} alt="instaclone"/>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10} className="buscador">
                        <Search/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
