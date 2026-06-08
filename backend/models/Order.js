const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  quantity: { type: Number, default: 1 },
})

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItemSchema],
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    address: { type: String },
    city: { type: String },
    paymentMethod: { type: String },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
// TODO: implement
