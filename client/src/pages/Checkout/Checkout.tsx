import React, { FC } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'

const Checkout: FC = () => {
	const stripePromise = loadStripe('pk_test_51MlUTLHpyo7m8mmWJcyguFLxcRtZK8g3qQZNZMv9ZUn2RGYHyoTQJnqdYmr2BbZZwHKNhHYQCQ4IPjigtXXLLcxJ00qUdC8Pes')

	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	)
}

export default Checkout
