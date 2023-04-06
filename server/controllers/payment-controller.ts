import { NextFunction, Request } from 'express'


class PaymentController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const totalAmount = req.body.amount

    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PaymentController()
