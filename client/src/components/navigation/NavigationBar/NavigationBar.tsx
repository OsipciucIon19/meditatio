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
import { Context } from 'index'
import { observer } from 'mobx-react-lite'

const NavigationBar: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()
	const location = useLocation()
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)
	const [url, setUrl] = useState<string>('')
	const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

	const listLinks = [
		{ title: 'Cursuri', path: 'courses' },
		{ title: 'Prețuri', path: 'prices' },
		{ title: 'Despre noi', path: 'about-us' }
	]

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
		setUrl(location.pathname)
		setIsNavbarOpen(false)
	}, [store, location])

	return (
		<Navbar className="blurry-bg" sticky="top" expand="md">
			<Link
				className="navbar-brand" to="/">
				<img className="logo-image" src={logo} alt="logo" width="70" height="70"/>
				<span className="logo-title">meditat.io</span>
			</Link>
			<NavbarToggler onClick={toggleNavbar}/>
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
                                        Cabinet Personal
									</DropdownItem>
									<DropdownItem
										tag={Link}    
										to="calendar"
									>
                                        Calendar
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button
								color="danger"
								onClick={async () => {
									await store.logout()
									return navigate('/')
								}}
							>
                                Deloghează-te
							</Button>
						</div> :
						<div className="unauthorized-buttons">
							<Link to="login" className="btn btn-secondary">
                                Intră în cont
							</Link>
							<Link to="registration" style={{ margin: '0.3rem' }}>
                                Obține un cont
							</Link>
						</div>
					}
				</NavbarText>
			</Collapse>
		</Navbar>
	)
}

export default observer(NavigationBar)
