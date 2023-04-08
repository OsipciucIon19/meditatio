import { Order } from '../types'

const { Schema, model } = require('mongoose')
const { ObjectId } = require('mongodb')

const OrderSchema: Order = new Schema({
  event: { type: ObjectId, required: true, ref: 'Event' },
  addressCity: { type: String, required: true },
  addressCountry: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false },
  addressZip: { type: String, required: true },
  paid: { type: Boolean, required: true }
})

module.exports = model('Order', OrderSchema)
