const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

function generateToken(user) {
	return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// POST /register
router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
		const exists = await User.findOne({ email })
		if (exists) return res.status(400).json({ message: 'User already exists' })
		const user = await User.create({ name, email, password })
		return res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user) })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// POST /login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) return res.status(401).json({ message: 'Invalid credentials' })
		const match = await user.matchPassword(password)
		if (!match) return res.status(401).json({ message: 'Invalid credentials' })
		return res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user) })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// POST /forgot-password
router.post('/forgot-password', async (req, res) => {
	try {
		const { email } = req.body
		if (!email) return res.status(400).json({ message: 'Email required' })
		const user = await User.findOne({ email })
		if (!user) return res.status(200).json({ message: 'If that email exists, a reset link has been sent' })

		const token = crypto.randomBytes(20).toString('hex')
		const hashed = crypto.createHash('sha256').update(token).digest('hex')
		user.resetPasswordToken = hashed
		user.resetPasswordExpiry = Date.now() + 3600000 // 1 hour
		await user.save()

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
		const resetLink = `${clientUrl}/reset-password/${token}`

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: 'Aevora Password Reset',
			html: `<p>Click the link to reset your password (valid 1 hour):</p><p><a href="${resetLink}">${resetLink}</a></p>`,
		}

		await transporter.sendMail(mailOptions)
		return res.json({ message: 'If that email exists, a reset link has been sent' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// POST /reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
	try {
		const { token } = req.params
		const { password } = req.body
		if (!password) return res.status(400).json({ message: 'Password required' })
		const hashed = crypto.createHash('sha256').update(token).digest('hex')
		const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpiry: { $gt: Date.now() } })
		if (!user) return res.status(400).json({ message: 'Invalid or expired token' })
		user.password = password
		user.resetPasswordToken = undefined
		user.resetPasswordExpiry = undefined
		await user.save()
		return res.json({ message: 'Password reset successful' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// POST /contact - public contact form endpoint
router.post('/contact', async (req, res) => {
	try {
		const { name, email, subject, message } = req.body
		if (!name || !email || !subject || !message) {
			return res.status(400).json({ message: 'All fields are required' })
		}

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: `[Aevora Contact] ${subject} — ${name}`,
			html: `<p><strong>Name:</strong> ${name}</p>\n             <p><strong>Email:</strong> ${email}</p>\n             <p><strong>Subject:</strong> ${subject}</p>\n             <hr />\n             <p>${message.replace(/\n/g, '<br/>')}</p>`,
		}

		await transporter.sendMail(mailOptions)
		return res.json({ message: 'Thank you — your message has been sent.' })
	} catch (err) {
		console.error('Contact send error', err)
		res.status(500).json({ message: 'Failed to send message' })
	}
})

// GET /profile - Get current user profile (protected)
router.get('/profile', protect, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password')
		if (!user) return res.status(404).json({ message: 'User not found' })
		return res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone || '',
			address: user.address || { street: '', city: '', country: 'Rwanda' },
			createdAt: user.createdAt,
			isAdmin: user.isAdmin,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// PUT /profile - Update user profile (protected)
router.put('/profile', protect, async (req, res) => {
	try {
		const { name, email, phone, address } = req.body
		const user = await User.findById(req.user._id)
		if (!user) return res.status(404).json({ message: 'User not found' })

		// Check if email changed and if it's already taken
		if (email && email !== user.email) {
			const emailExists = await User.findOne({ email: email.toLowerCase() })
			if (emailExists) return res.status(400).json({ message: 'Email already in use' })
		}

		// Update fields
		if (name) user.name = name
		if (email) user.email = email.toLowerCase()
		if (phone) user.phone = phone
		if (address) {
			user.address = {
				street: address.street || user.address?.street || '',
				city: address.city || user.address?.city || '',
				country: address.country || user.address?.country || 'Rwanda',
			}
		}

		await user.save()

		// Return updated user + new token (since email may have changed)
		const newToken = generateToken(user)
		return res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone || '',
			address: user.address || { street: '', city: '', country: 'Rwanda' },
			isAdmin: user.isAdmin,
			token: newToken,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

// PUT /change-password - Change user password (protected)
router.put('/change-password', protect, async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body
		if (!currentPassword || !newPassword) {
			return res.status(400).json({ message: 'Current and new password required' })
		}

		const user = await User.findById(req.user._id)
		if (!user) return res.status(404).json({ message: 'User not found' })

		// Verify current password
		const isMatch = await user.matchPassword(currentPassword)
		if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' })

		// Update password
		user.password = newPassword
		await user.save()

		return res.json({ message: 'Password updated successfully' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server error' })
	}
})

module.exports = router
