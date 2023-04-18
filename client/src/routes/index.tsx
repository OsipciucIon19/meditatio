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
import { Context } from 'App'
import Checkout from '../pages/Checkout/Checkout'
import CheckoutSuccess from '../pages/Checkout/CheckoutSuccess'
import UserProfile from '../pages/User/UserProfile'
import Lesson from '../pages/Lesson/Lesson'
import { ProSidebarProvider } from 'react-pro-sidebar'

const Index = () => {
  const { pathname } = useLocation()
  const { store } = useContext(Context)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathname.includes('lesson')) {
      store.setIsFullWidthPage(true)
    } else {
      store.setIsFullWidthPage(false)
    }
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
    { id: 'userProfilePage', path: '/profile', element: <UserProfile user={store?.user}/> },
    { id: 'checkoutPage', path: '/checkout', element: <Checkout/> },
    { id: 'checkoutSuccessPage', path: '/checkout/success', element: <CheckoutSuccess/> },
    { id: 'notFoundPage', path: '*', element: <NotFoundPage/> },
    { id: 'lessonPage', path: '/lesson/:id', element: <ProSidebarProvider><Lesson /></ProSidebarProvider> }
  ]

  return (
    <div
      className={`${!store.isFullWidthPage ? 'container' : ''} position-relative`}
      style={store.isFullWidthPage ? { height: 'calc(100vh - 162px)' } :
        { minHeight: 'calc(100vh - 498px)', margin: '2rem auto' }}
    >
      <Routes>
        {
          routeList.map(({ id, path, element }) =>
            <Route key={id} path={path} element={element}/>)
        }
      </Routes>
    </div>
  )
}

export default observer(Index)
