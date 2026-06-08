const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { protect, adminOnly } = require('../middleware/auth')

// POST / - create order (protected)
router.post('/', protect, async (req, res) => {
	try {
		const { items, customerName, customerEmail, customerPhone, address, city, paymentMethod, totalAmount } = req.body
		if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' })
		const order = await Order.create({
			user: req.user._id,
			items,
			customerName,
			customerEmail,
			customerPhone,
			address,
			city,
			paymentMethod,
			totalAmount,
		})
		res.status(201).json(order)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// GET /user/me - get current user's orders (protected)
router.get('/user/me', protect, async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
		res.json(orders)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// GET / - get all orders (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
	try {
		const orders = await Order.find({}).sort({ createdAt: -1 })
		res.json(orders)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// GET /stats - admin only
router.get('/stats', protect, adminOnly, async (req, res) => {
	try {
		const totalOrders = await Order.countDocuments()
		const revenueAgg = await Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$totalAmount' } } }])
		const totalRevenue = revenueAgg[0]?.revenue || 0
		const pendingOrders = await Order.countDocuments({ status: 'pending' })
		const deliveredOrders = await Order.countDocuments({ status: 'delivered' })
		res.json({ totalOrders, totalRevenue, pendingOrders, deliveredOrders })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// GET /:id - get single order (protected)
router.get('/:id', protect, async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
		if (!order) return res.status(404).json({ message: 'Order not found' })
		// only owner or admin
		if (!req.user.isAdmin && order.user?.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: 'Forbidden' })
		}
		res.json(order)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// PUT /:id/status - update order status (admin only)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
	try {
		const { status } = req.body
		const order = await Order.findById(req.params.id)
		if (!order) return res.status(404).json({ message: 'Order not found' })
		order.status = status
		await order.save()
		res.json(order)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

module.exports = router
