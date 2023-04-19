import React, { FC, useEffect, useState } from 'react'
import { Button, Container, Spinner, Toast, ToastHeader } from 'reactstrap'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  useEffect(() => {
    const { eventInfo } = location?.state
    setEvent({
      ...eventInfo
    })

    return () => {
      setEvent({})
    }
  }, [])

  const paymentToken = async (token) => {
    setIsPaymentProcessing(true)
    try {
      const response = await axios({
        url: 'http://localhost:5000/api/payment/create',
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
    <Container>
      {isPaymentProcessing &&
          <div className="p-3 position-absolute" style={{ top: '0', right: '0' }}>
            <Toast
              className="d-inline-block m-1 bg-success"
              bg="Success"
            >
              <ToastHeader icon={<Spinner size="sm">Loading...</Spinner>}>
                Plata dvs la moment se procesează
              </ToastHeader>
            </Toast>
          </div>
      }
      <h2>Payment</h2>
      <p>
        Product: {event?.student}
      </p>
      <p>
        Price: {event?.amount} MDL
      </p>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PK}
        label="Continua cu formularul de plata"
        name="Pay with credit card"
        billingAddress
        shippingAddress
        amount={parseInt(event?.amount)}
        token={paymentToken}
      >
        <Button>Pay</Button>
      </StripeCheckout>
    </Container>
  )
}

export default Checkout
