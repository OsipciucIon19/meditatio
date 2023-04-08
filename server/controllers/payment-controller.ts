const Stripe = require('stripe')(process.env.SECRET_KEY)
const eventService = require('../service/event-service')
const paymentService = require('../service/payment-service')
const ObjectId = require('mongodb').ObjectId

class PaymentController {

  async createPayment(request, response) {
    const status = { message: undefined }
    const { token, event, amount } = request.body

    try {
      const paymentInfo = await Stripe.charges.create({
        source: token.id,
        amount,
        currency: 'mdl'
      })
      status.message = 'success'

      const eventId = await eventService.addEvent(event)
      const {
        address_city: addressCity,
        address_country: addressCountry,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_zip: addressZip
      } = paymentInfo.source

      await paymentService.createNewOrder(
        ObjectId(eventId), addressCity, addressCountry, addressLine1, addressLine2, addressZip, paymentInfo.paid
      )

    } catch (err) {
      console.log(err)
      status.message = 'failure'
    }
    response.json(status)
  }
}

module.exports = new PaymentController()
