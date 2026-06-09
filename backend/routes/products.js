const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

const seed = [
  {
    name: 'Purity Foam Cleanser',
    price: 34,
    category: 'cleanser',
    featured: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    ingredients: ['Glycerin', 'Amino Acids', 'Green Tea Extract'],
    benefits: ['Gentle cleansing', 'Maintains barrier', 'Brightens'],
    description: 'A gentle foam cleanser that removes impurities while preserving skin balance.'
  },
  {
    name: 'Micellar Cleansing Water',
    price: 28,
    category: 'cleanser',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    ingredients: ['Micelles', 'Panthenol', 'Cucumber Extract'],
    benefits: ['Removes makeup', 'Soothes skin', 'No rinse required'],
    description: 'A refreshing micellar water for quick and gentle makeup removal.'
  },
  {
    name: 'Cell-Reset Serum',
    price: 78,
    category: 'serum',
    featured: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    ingredients: ['Retinoid Complex', 'Peptides', 'Niacinamide'],
    benefits: ['Renews cells', 'Improves texture', 'Boosts radiance'],
    description: 'A potent serum to accelerate cellular renewal and skin density.'
  },
  {
    name: 'Vitamin C Brightening Serum',
    price: 82,
    category: 'serum',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Hyaluronic Acid'],
    benefits: ['Brightens', 'Fades dark spots', 'Antioxidant protection'],
    description: 'High-strength vitamin C serum for luminous, even-toned skin.'
  },
  {
    name: 'Peptide Renewal Serum',
    price: 88,
    category: 'serum',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=80',
    ingredients: ['Peptides', 'Ceramides', 'Squalane'],
    benefits: ['Smooths fine lines', 'Firming', 'Deep hydration'],
    description: 'Peptide-rich formula to support collagen production and elasticity.'
  },
  {
    name: 'Aura Hydration Essence',
    price: 68,
    category: 'moisturizer',
    featured: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    ingredients: ['Hyaluronic Acid', 'Glycerin', 'Aloe Vera'],
    benefits: ['Deep hydration', 'Soothes', 'Preps skin'],
    description: 'Lightweight essence delivering multi-layer hydration to the skin.'
  },
  {
    name: 'Barrier Shield Cream',
    price: 58,
    category: 'moisturizer',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    ingredients: ['Ceramides', 'Shea Butter', 'Squalane'],
    benefits: ['Strengthens barrier', 'Protects', 'Long-lasting moisture'],
    description: 'Rich cream to repair and protect the skin barrier all day.'
  },
  {
    name: 'Overnight Repair Mask',
    price: 55,
    category: 'moisturizer',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
    ingredients: ['Niacinamide', 'Peptides', 'Oat Extract'],
    benefits: ['Repairs overnight', 'Restores radiance', 'Improves texture'],
    description: 'An overnight mask to boost skin recovery while you sleep.'
  },
  {
    name: 'Lumi Eye Concentrate',
    price: 65,
    category: 'eye-care',
    featured: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=600&q=80',
    ingredients: ['Caffeine', 'Peptides', 'Vitamin K'],
    benefits: ['Brightens under-eye', 'Reduces puffiness', 'Smooths fine lines'],
    description: 'Targeted eye concentrate for brighter, firmer eye area.'
  },
  {
    name: 'Dark Circle Eye Serum',
    price: 59,
    category: 'eye-care',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee1f93?w=600&q=80',
    ingredients: ['Vitamin C', 'Niacinamide', 'Licorice Root'],
    benefits: ['Reduces pigmentation', 'Evens tone', 'Lightweight'],
    description: 'Serum formulated to tackle stubborn dark circles.'
  },
  {
    name: 'SPF 50 Defence Fluid',
    price: 48,
    category: 'serum',
    featured: false,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&q=80',
    ingredients: ['Broad Spectrum Filters', 'Antioxidants', 'Lightweight Emollients'],
    benefits: ['High protection', 'Non-greasy', 'Suitable under makeup'],
    description: 'High-protection fluid with a lightweight, non-greasy finish.'
  },
  {
    name: 'Aevora Complete Ritual',
    price: 229,
    category: 'bundle',
    featured: true,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    ingredients: ['Full regimen included'],
    benefits: ['Complete system', 'Best value', 'Full results'],
    description: 'A complete 4-step ritual including cleanser, serums, essence and cream.'
  },
]

// GET / - list products with optional filter query
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.featured === 'true') filter.featured = true
    if (req.query.featured === 'false') filter.featured = false
    if (req.query.category) filter.category = req.query.category

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /seed - populate products from seed data if none exist
router.get('/seed', async (req, res) => {
  try {
    const count = await Product.countDocuments()
    if (count > 0) {
      return res.json({ message: 'Products already seeded', count })
    }

    const created = await Product.insertMany(seed)
    res.json({ message: 'Products seeded', count: created.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /:id - get a single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
