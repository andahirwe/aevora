import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import AIAdvisor from '../components/AIAdvisor'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const videos = [
  '/videos/skin1.mp4',
  '/videos/skin2.mp4',
  '/videos/skin3.mp4',
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [advisorOpen, setAdvisorOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    axios.get(`${API}/products?featured=true`)
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.src = videos[currentVideo]
    video.load()
    video.play().catch(() => {})
  }, [currentVideo])

  const handleVideoEnd = () => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentVideo(prev => (prev + 1) % videos.length)
      setTimeout(() => setTransitioning(false), 500)
    }, 500)
  }

  const switchVideo = (index) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentVideo(index)
      setTimeout(() => setTransitioning(false), 500)
    }, 500)
  }

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Single Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Transition overlay */}
        <div className={`absolute inset-0 bg-espresso z-10 transition-opacity duration-500 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-espresso/60 z-20" />

        {/* Content */}
        <div className="relative z-30 text-center px-6 max-w-4xl mx-auto">
          <p className="font-dm text-xs tracking-[0.3em] uppercase text-ivory/70 mb-6">
            Advanced Skincare Science
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-ivory leading-none mb-6">
            Timeless Science.<br />
            <em className="text-gold">Radiant Skin.</em>
          </h1>
          <p className="font-dm text-base text-ivory/70 max-w-lg mx-auto leading-relaxed mb-10">
            Skincare engineered for how your skin lives. Advanced formulas developed in collaboration with leading skin scientists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-ivory text-espresso font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold transition-colors"
            >
              Shop the Collection
            </Link>
            <button
              onClick={() => setAdvisorOpen(true)}
              className="border border-ivory text-ivory font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-ivory hover:text-espresso transition-colors"
            >
              AI Skin Advisor
            </button>
          </div>
        </div>

        {/* Video indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => switchVideo(i)}
              className={`w-8 h-0.5 transition-all ${
                i === currentVideo ? 'bg-ivory' : 'bg-ivory/30'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-30">
          <span className="font-dm text-xs tracking-widest uppercase text-ivory/60">Scroll</span>
          <div className="w-px h-8 bg-ivory/30"></div>
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