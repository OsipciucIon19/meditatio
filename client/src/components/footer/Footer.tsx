import React, { FC, useContext } from 'react'
import { Col, Container, NavItem, Row } from 'reactstrap'
import { StyledFooter } from './Footer.styled'
import { Link } from 'react-router-dom'
import CopyrightFooter from './CopyrightFooter'
import { Context } from '../../App'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

const Footer: FC = () => {
  const { store } = useContext(Context)
  const { t } = useTranslation()
  const firstColumnLinks = [
    { title: t('link-courses'), path: 'courses' },
    { title: t('link-prices'), path: 'prices' },
    { title: t('link-become-a-teacher'), path: 'become-a-teacher' }
  ]

  const secondColumnLinks = [
    { title: t('link-about-us'), path: 'about-us' },
    { title: t('link-how-it-works'), path: 'how-it-works' }
  ]

  return (
    <StyledFooter style={store.isFullWidthPage ? { marginTop: '0' } : {}}>
      {!store.isFullWidthPage &&
          <Container data-testid="Footer">
            <Row className="py-4">
              <Col>
                <Link to="/" className="logo-title footer-logo">meditat.io</Link>
              </Col>
              <Col>
                <ul className="p-0">
                  <li className="nav-item fw-bolder text-decoration-underline">{t('link-product')}</li>
                  {firstColumnLinks.map(link => <NavItem key={link.path}><Link
                    className="nav-link"
                    to={link.path}>{link.title}</Link></NavItem>)}
                </ul>
              </Col>
              <Col>
                <ul className="p-0">
                  <li className="nav-item fw-bolder text-decoration-underline">{t('link-support')}</li>
                  {secondColumnLinks.map(link => <NavItem key={link.path}><Link
                    className="nav-link"
                    to={link.path}>{link.title}</Link></NavItem>)}
                </ul>
              </Col>
            </Row>
          </Container> 
      }
      <CopyrightFooter/>
    </StyledFooter>
  )
}

export default observer(Footer)
