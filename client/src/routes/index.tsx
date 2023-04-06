import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from 'pages/Home/Home'
import Courses from 'pages/Courses/Courses'
import Prices from 'pages/Prices/Prices'
import AboutUs from 'pages/AboutUs/AboutUs'
import LoginForm from 'components/authentication/LoginForm/LoginForm'
import RegistrationForm from 'components/authentication/RegistrationForm/RegistrationForm'
import NotFoundPage from 'pages/NotFound/NotFoundPage'
import CourseDetails from 'pages/CourseDetails/CourseDetails'
import UserCalendar from '../pages/User/UserCalendar'
import Schedule from 'pages/Schedule/Schedule'
import { observer } from 'mobx-react-lite'
import { Context } from 'index'
import Checkout from '../pages/Checkout/Checkout'

const Router = () => {
	const { pathname } = useLocation()
	const { store } = useContext(Context)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	const routeList = [
		{ id: 'homePage', path: '/', element: <Home/> },
		{ id: 'pricesPage', path: '/prices', element: <Prices/> },
		{ id: 'aboutUsPage', path: '/about-us', element: <AboutUs/> },
		{ id: 'coursesPage', path: '/courses', element: <Courses/> },
		{ id: 'courseDetailsPage', path: '/courses/:id', element: <CourseDetails/> },
		{
			id: 'schedulePage',
			path: '/schedule',
			element: <Schedule userId={store?.user._id} userRoles={store?.user.roles}/>
		},
		{ id: 'loginPage', path: '/login', element: <LoginForm/> },
		{ id: 'registrationPage', path: '/registration', element: <RegistrationForm/> },
		{
			id: 'userCalendarPage',
			path: '/calendar',
			element: <UserCalendar userId={store?.user._id} userRoles={store?.user.roles}/>
		},
		{ id: 'checkoutPage', path: '/checkout', element: <Checkout /> },
		{ id: 'notFoundPage', path: '*', element: <NotFoundPage/> }
	]

	return (
		<Routes>
			{
				routeList.map(({ id, path, element }) =>
					<Route key={id} path={path} element={element}/>)
			}
		</Routes>
	)
}

export default observer(Router)
