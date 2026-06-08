const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
	try {
		const auth = req.headers.authorization
		if (!auth || !auth.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Not authorized' })
		}
		const token = auth.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.id).select('-password')
		if (!user) return res.status(401).json({ message: 'Not authorized' })
		req.user = user
		next()
	} catch (err) {
		console.error(err)
		return res.status(401).json({ message: 'Not authorized' })
	}
}

const adminOnly = (req, res, next) => {
	if (!req.user || !req.user.isAdmin) {
		return res.status(403).json({ message: 'Admin only' })
	}
	next()
}

module.exports = { protect, adminOnly }
