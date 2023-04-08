import React, { FC, useEffect, useState } from 'react'
import { Button, Container } from 'reactstrap'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  // const priceForStripe = product.amount * 100

  useEffect(() => {
    const { eventInfo } = location?.state
    setEvent({
      ...eventInfo
    })
  }, [])

  const paymentToken = async (token) => {
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
    }
  }

  return (
    <Container>
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
        amount={event?.amount}
        token={paymentToken}
      >
        <Button>Pay</Button>
      </StripeCheckout>
    </Container>
  )
}

export default Checkout
