const OrderModel = require('../models/Order')

class PaymentService {
  async createNewOrder(event, addressCity, addressCountry, addressLine1, addressLine2, addressZip, paid) {
    return OrderModel.create({
      event, addressCity, addressCountry, addressLine1, addressLine2, addressZip, paid
    })
  }
}

module.exports = new PaymentService()