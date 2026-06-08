const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['cleanser', 'serum', 'moisturizer', 'eye-care', 'bundle'],
    },
    image: { type: String, required: true },
    stock: { type: Number, default: 100 },
    featured: { type: Boolean, default: false },
    ingredients: [String],
    benefits: [String],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)