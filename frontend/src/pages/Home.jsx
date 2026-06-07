import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import AIAdvisor from '../components/AIAdvisor'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [advisorOpen, setAdvisorOpen] = useState(false)

  useEffect(() => {
    axios.get(`${API}/products?featured=true`)
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A96E 0%, transparent 60%)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-dm text-xs tracking-[0.3em] uppercase text-taupe mb-6">
            Advanced Skincare Science
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-espresso leading-none mb-6">
            Timeless Science.<br />
            <em className="text-taupe">Radiant Skin.</em>
          </h1>
          <p className="font-dm text-base text-taupe max-w-lg mx-auto leading-relaxed mb-10">
            Skincare engineered for how your skin lives. Advanced formulas developed in collaboration with leading skin scientists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-mocha text-ivory font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-espresso transition-colors"
            >
              Shop the Collection
            </Link>
            <button
              onClick={() => setAdvisorOpen(true)}
              className="border border-mocha text-mocha font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-mocha hover:text-ivory transition-colors"
            >
              AI Skin Advisor
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-dm text-xs tracking-widest uppercase text-taupe">Scroll</span>
          <div className="w-px h-8 bg-taupe/40"></div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Support', desc: 'Strengthening the skin\'s ability to withstand daily environmental stress.' },
            { title: 'Recover', desc: 'Accelerating cellular renewal for faster, more visible recovery.' },
            { title: 'Maintain', desc: 'Sustaining optimal skin performance over time with consistent care.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 border-t border-sand pt-8">
              <span className="font-dm text-xs tracking-[0.3em] uppercase text-gold">0{i + 1}</span>
              <h3 className="font-cormorant text-3xl text-espresso">{item.title}</h3>
              <p className="font-dm text-sm text-taupe leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-2">The Collection</p>
              <h2 className="font-cormorant text-5xl text-espresso">Skin Fitness System</h2>
            </div>
            <Link
              to="/products"
              className="hidden md:block font-dm text-xs tracking-widest uppercase text-taupe border-b border-taupe pb-1 hover:text-espresso hover:border-espresso transition-colors"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-sand animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 3).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-mocha text-ivory font-dm text-xs tracking-widest uppercase px-12 py-4 hover:bg-espresso transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Ritual Steps */}
      <section className="py-24 px-6 bg-espresso text-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-dm text-xs tracking-widest uppercase text-gold mb-4">The Ritual</p>
            <h2 className="font-cormorant text-5xl">4 Essential Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Cleanse', product: 'Purity Foam Cleanser', desc: 'Remove impurities while preserving your barrier.' },
              { step: '02', title: 'Activate', product: 'Cell-Reset Serum', desc: 'Stimulate cellular renewal and skin density.' },
              { step: '03', title: 'Recover', product: 'Aura Hydration Essence', desc: 'Train your barrier for long-term resilience.' },
              { step: '04', title: 'Maintain', product: 'Lumi Eye Concentrate', desc: 'Target the most delicate skin with precision.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 border-t border-ivory/10 pt-8">
                <span className="font-cormorant text-4xl text-gold/40">{item.step}</span>
                <h3 className="font-cormorant text-2xl">{item.title}</h3>
                <p className="font-dm text-xs tracking-widest uppercase text-ivory/50">{item.product}</p>
                <p className="font-dm text-sm text-ivory/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advisor Banner */}
      <section className="py-20 px-6 bg-gold/10 border-y border-gold/20">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe">New Feature</p>
          <h2 className="font-cormorant text-5xl text-espresso">Meet Your AI Skin Advisor</h2>
          <p className="font-dm text-sm text-taupe leading-relaxed">
            Describe your skin concerns and get personalized product recommendations powered by advanced AI — built just for Aevora.
          </p>
          <button
            onClick={() => setAdvisorOpen(true)}
            className="self-center bg-mocha text-ivory font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-espresso transition-colors"
          >
            Try AI Advisor
          </button>
        </div>
      </section>

      {/* AI Advisor Modal */}
      <AIAdvisor isOpen={advisorOpen} onClose={() => setAdvisorOpen(false)} />
    </div>
  )
}