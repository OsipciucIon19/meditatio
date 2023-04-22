import React, { FC, useContext, useEffect, useState } from 'react'
import logo from 'assets/images/logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Navbar,
  Button,
  Collapse,
  Nav,
  NavbarText,
  NavbarToggler,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'
import { Context } from 'App'
import { observer } from 'mobx-react-lite'
import { RxHamburgerMenu } from 'react-icons/all'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'

const NavigationBar: FC = () => {
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [url, setUrl] = useState<string>('')
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(Cookies.get('i18next'))
  const { t, i18n } = useTranslation()
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const listLinks = [
    { title: t('link-courses'), path: 'courses' },
    { title: t('link-prices'), path: 'prices' },
    { title: t('link-about-us'), path: 'about-us' }
  ]

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    setUrl(location.pathname)
    setIsNavbarOpen(false)
  }, [store, location])

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <Navbar className="blurry-bg fixed-top" expand="md" data-testid="NavigationBar">
      <Link
        className="navbar-brand" to="/">
        <img className="logo-image" src={logo} alt="logo" width="70" height="70"/>
        <span className="logo-title">meditat.io</span>
      </Link>
      <NavbarToggler onClick={toggleNavbar}>
        <RxHamburgerMenu />
      </NavbarToggler>
      <Collapse isOpen={isNavbarOpen} navbar>
        <Nav className="me-auto" navbar>
          {listLinks.map(link => <NavItem key={link.path}><Link
            className={'nav-link ' + (url.substring(1) === link.path ? 'active' : '')}
            to={link.path}>{link.title}</Link></NavItem>)}
        </Nav>
        <NavbarText>
          {store.isAuth ?
            <div className="authorized-buttons d-flex">
              <Dropdown
                isOpen={isDropdownOpen}
                toggle={toggleDropdown}
              >
                <DropdownToggle
                  style={{ cursor: 'pointer' }}
                  data-toggle="dropdown"
                  tag="span"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${store.user.firstName}+${store.user.lastName}&size=200`}
                    width="40"
                    alt="avatar"
                    style={{ borderRadius: '50px', margin: '0.3rem' }}
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                    Salut, <b>{store.user.firstName} {store.user.lastName}</b>!
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    tag={Link}
                    to="profile"
                  >
                    {t('user-account-2')}
                  </DropdownItem>
                  <DropdownItem
                    tag={Link}
                    to="calendar"
                  >
                    {t('user-calendar-2')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                color="danger"
                onClick={async () => {
                  await store.logout()
                  navigate('/')
                }}
              >
                {t('link-logout')}
              </Button>
            </div> :
            <div className="unauthorized-buttons">
              <Link to="login" className="btn btn-secondary">
                {t('link-login')}
              </Link>
              <Link to="registration" style={{ color: '#000', margin: '0.3rem' }}>
                {t('link-register')}
              </Link>
            </div>
          }
          <div className="language-button">
            {
              currentLanguage === 'fr' ?
                <img src="/images/flags/fr.svg" alt="France Flag" onClick={() => changeLanguage('ro')} /> :
                <img src="/images/flags/md.svg" alt="Moldova Flag" onClick={() => changeLanguage('fr')} />
            }
          </div>
        </NavbarText>
      </Collapse>
    </Navbar>
  )
}

export default observer(NavigationBar)
