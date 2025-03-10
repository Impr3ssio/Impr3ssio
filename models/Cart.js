// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  volume: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, // Add quantity field
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);