import React, { FC, useEffect, useState } from 'react'
import { Button, Spinner, Toast, ToastHeader } from 'reactstrap'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { StyledCheckout } from './Checkout.styled'
import { useFetching } from 'hooks/useFetching'
import CourseService from 'services/CourseService'
import UserService from 'services/UserService'
import { useTranslation } from 'react-i18next'

const Checkout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [course, setCourse] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const monthNames = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ]
  const { t } = useTranslation()
  const [fetchTeacher] = useFetching(async (teacherId) => {
    const response = await UserService.fetchOneUser(teacherId)
    setTeacher(response.data)
  })
  
  const [fetchCourse] = useFetching(async (courseId) => {
    const response = await CourseService.fetchOneCourse(courseId)
    setCourse(response.data)
  })
  
  useEffect(() => {
    const { eventInfo } = location?.state
    setEvent({
      ...eventInfo
    })
    
    Promise
      .all([fetchTeacher(eventInfo.teacher), fetchCourse(eventInfo.course)])
      .catch(err => console.log(err))

    return () => {
      setEvent({})
      setTeacher({})
      setCourse({})
    }
  }, [])

  const paymentToken = async (token) => {
    setIsPaymentProcessing(true)
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/payment/create`,
        method: 'POST',
        data: {
          amount: event.amount * 100,
          event,
          token
        }
      })
      if (response.status === 200) {
        navigate('/checkout/success')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsPaymentProcessing(false)
    }
  }

  return (
    <>
      {isPaymentProcessing &&
        <div className="p-3 position-absolute" style={{ top: '0', right: '0' }}>
          <Toast
            className="d-inline-block m-1 bg-success"
            bg="Success"
          >
            <ToastHeader icon={<Spinner size="sm">Loading...</Spinner>}>
              {t('payment-processing')}
            </ToastHeader>
          </Toast>
        </div>
      }
      <StyledCheckout className="blurry-bg">

        <div className="d-flex justify-content-center flex-column">
          <h1 className="heading">{t('payment-review')}</h1>
          <p className="mx-auto my-2">
            {course?.subject?.title} {t('courses-class')} {course?.subject?.grade}
          </p>
          <p className="mx-auto my-2">
            <b>{event?.start.getDate()} {monthNames[event?.start.getMonth()]} {event?.start.getYear() + 1900}</b>
          </p>

          <p className="d-flex flex-column mx-auto my-2">
            <img
              className="m-auto"
              src={`https://ui-avatars.com/api/?name=${teacher?.firstName}+${teacher?.lastName}&size=50`}
              alt="avatar"
              style={{ borderRadius: '25px' }}
            />
            <span className="m-auto">{teacher?.firstName} {teacher?.lastName}</span>
          </p>
          <hr/>
          <p className="mx-auto my-2">
            <b>{t('total-payment')}:</b> {event?.amount} lei
          </p>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PK}
            name="Pay with credit card"
            billingAddress
            shippingAddress={false}
            amount={parseInt(event?.amount) * 100}
            token={paymentToken}
            currency="MDL"
          >
            <Button className="d-flex m-auto">{t('continue-to-payment')}</Button>
          </StripeCheckout>
        </div>
      </StyledCheckout>
    </>
  )
}

export default Checkout
