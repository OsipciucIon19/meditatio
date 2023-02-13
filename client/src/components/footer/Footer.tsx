import React, {FC} from 'react'
import {Col, Container, NavItem, Row} from 'reactstrap'
import {StyledFooter} from './Footer.styled'
import {Link} from "react-router-dom";
import CopyrightFooter from "./CopyrightFooter";

const Footer: FC = () => {
    const firstColumnLinks = [
        {title: 'Cursuri', path: 'courses'},
        {title: 'Prețuri', path: 'prices'},
        {title: 'Devino profesor', path: 'become-a-teacher'}
    ]

    const secondColumnLinks = [
        {title: 'Despre noi', path: 'about-us'},
        {title: 'Cum funcționează', path: 'how-it-works'}
    ]

    return (
        <StyledFooter>
            <Container>
                <Row className="py-4">
                    <Col>
                        <Link to="/" className="logo-title footer-logo">meditat.io</Link>
                    </Col>
                    <Col>
                        <ul className="p-0">
                            <li className="nav-item fw-bolder text-decoration-underline">Produs</li>
                            {firstColumnLinks.map(link => <NavItem key={link.path}><Link
                                className="nav-link"
                                to={link.path}>{link.title}</Link></NavItem>)}
                        </ul>
                    </Col>
                    <Col>
                        <ul className="p-0">
                            <li className="nav-item fw-bolder text-decoration-underline">Suport</li>
                            {secondColumnLinks.map(link => <NavItem key={link.path}><Link
                                className="nav-link"
                                to={link.path}>{link.title}</Link></NavItem>)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <CopyrightFooter/>
        </StyledFooter>
    )
}

export default Footer
