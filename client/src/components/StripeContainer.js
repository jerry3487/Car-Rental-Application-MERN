import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripePay from './StripePay'

const stripePromise = loadStripe(
  'pk_test_51OJri4SG6PbzslvbEi5AqVuhUfMNaGnMazfZcUrjJAxt4JGMpZ8WrevW8kp34pXxY6v2E77UmEnKYQCkqVULrnDR00Ns7USABb'
)

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripePay />
    </Elements>
  )
}

export default StripeContainer
