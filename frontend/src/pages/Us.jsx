import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function IconCheck() {
  return (
    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg className="w-8 h-8 text-mocha" viewBox="0 0 24 24" fill="none">
      <path d="M3 21c6-6 6-16 18-18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Us() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      const res = await axios.post(`${API}/contact`, form)
      setSuccess(res.data?.message || 'Message sent — we will reply shortly.')
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-dm text-taupe">

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1600&q=80"
          alt="Aevora"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto text-ivory">
          <h1 className="font-cormorant text-7xl">We Are Aevora</h1>
          <p className="mt-4 text-lg text-ivory/70">
            Science-forward skincare that treats your regimen like fitness — consistent, progressive, and results-driven.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-ivory py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-cormorant text-5xl text-espresso">Born from a belief</h2>
            <p className="mt-6 text-base text-taupe leading-relaxed">
              Aevora began with a simple conviction: skincare should be as intentional as your fitness routine. We combine rigorous science with thoughtful formulation to build products that perform, day after day.
            </p>
            <p className="mt-4 text-base text-taupe leading-relaxed">
              Our approach is progressive — measurable improvements through consistent use. Each formula is constructed from clinically-supported ingredients selected to deliver targeted outcomes without compromise.
            </p>
            <p className="mt-4 text-base text-taupe leading-relaxed">
              We design regimens, not quick fixes. Over time, with discipline and the right actives, skin transforms — stronger, clearer, and more resilient.
            </p>
            <ol className="mt-8 space-y-4">
              {[
                { title: 'Evidence-Led Formulation', desc: 'Every ingredient is chosen for demonstrated efficacy and safety.' },
                { title: 'Consistent Rituals', desc: 'Results depend on routine — we design products to integrate seamlessly into daily life.' },
                { title: 'Transparency & Integrity', desc: 'Clear labeling, no fillers, and a commitment to safety.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="text-gold font-bold text-xl">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-espresso">{item.title}</p>
                    <p className="text-taupe">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded overflow-hidden shadow-lg bg-cream">
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80"
              alt="Laboratory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-espresso text-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-cormorant text-4xl text-ivory">Our Mission & Values</h3>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Science First', desc: 'Every ingredient is supported by research and selected to drive meaningful results.' },
              { title: 'Integrity Always', desc: 'Transparent labels and a strict no-harmful-fillers policy.' },
              { title: 'Results Driven', desc: 'We prioritize measurable improvement — only efficacious actives make the cut.' },
            ].map((item, i) => (
              <div key={i} className="bg-ivory/5 p-6 border border-ivory/10">
                <h4 className="font-cormorant text-xl text-gold">{item.title}</h4>
                <p className="mt-3 text-sm text-ivory/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-cormorant text-4xl text-espresso">Our Promise</h3>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <div className="bg-ivory p-6">
              <div className="flex items-center gap-4">
                <IconLeaf />
                <h5 className="font-semibold text-espresso">Cruelty Free & Vegan</h5>
              </div>
              <p className="mt-3 text-sm text-taupe">Formulations that respect animals and people.</p>
            </div>
            <div className="bg-ivory p-6">
              <div className="flex items-center gap-4">
                <IconCheck />
                <h5 className="font-semibold text-espresso">No Harmful Ingredients</h5>
              </div>
              <p className="mt-3 text-sm text-taupe">We avoid parabens, sulfates and questionable fillers.</p>
            </div>
            <div className="bg-ivory p-6">
              <div className="flex items-center gap-4">
                <svg className="w-8 h-8 text-mocha" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <h5 className="font-semibold text-espresso">Sustainably Sourced</h5>
              </div>
              <p className="mt-3 text-sm text-taupe">Ingredients chosen for efficacy and environmental stewardship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-cormorant text-4xl text-espresso">The Minds Behind Aevora</h3>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Amara Osei', title: 'Founder & CEO', bio: 'A cosmetic physician and entrepreneur focused on clinical efficacy.' },
              { name: 'Dr. Yuki Tanaka', title: 'Lead Skin Scientist', bio: 'Leads formulation and clinical testing with decades of derm research.' },
              { name: 'Léa Moreau', title: 'Head of Product', bio: 'Designs the rituals and ensures exquisite sensory experience.' },
            ].map((m, i) => (
              <div key={i} className="bg-cream p-6 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-sand flex items-center justify-center">
                  <span className="font-cormorant text-3xl text-espresso">{m.name.split(' ')[1][0]}</span>
                </div>
                <h4 className="mt-4 font-cormorant text-xl text-espresso">{m.name}</h4>
                <p className="text-sm text-gold tracking-widest uppercase">{m.title}</p>
                <p className="mt-3 text-sm text-taupe">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="font-cormorant text-5xl text-espresso">Get In Touch</h3>
          <p className="mt-2 font-dm text-taupe">We'd love to hear from you</p>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            {success && (
              <div className="p-4 bg-ivory border border-gold text-espresso font-dm text-sm">{success}</div>
            )}
            {error && (
              <div className="p-4 bg-ivory border border-red-300 text-red-700 font-dm text-sm">{error}</div>
            )}
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Full name"
              className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Email address"
              className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
            />
            <select
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
            >
              <option>General Inquiry</option>
              <option>Order Support</option>
              <option>Press & Media</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Your message..."
              className="border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-mocha text-ivory font-dm text-xs tracking-widest uppercase py-4 hover:bg-espresso transition-colors disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-cormorant text-4xl text-espresso mb-8">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-3">
            {[
              { q: 'Where do you ship?', a: 'We ship worldwide to over 50 countries. Standard shipping takes 5-10 business days.' },
              { q: 'Are products cruelty free?', a: 'Yes, 100% cruelty free and vegan. We never test on animals.' },
              { q: 'How long before I see results?', a: 'Most customers see visible improvements in 4-6 weeks with consistent use.' },
              { q: 'Can I return products?', a: 'Yes, we offer a 30-day return policy. Contact us and we will arrange a full refund.' },
              { q: 'Where are products formulated?', a: 'In collaboration with leading Korean skin scientists using the latest biotechnology.' },
              { q: 'Are products suitable for sensitive skin?', a: 'Yes, all formulas are dermatologist tested and suitable for sensitive skin types.' },
            ].map((item, i) => (
              <div key={i} className="border border-sand bg-ivory">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-dm text-sm font-medium text-espresso">{item.q}</span>
                  <span className="text-gold text-xl">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 font-dm text-sm text-taupe border-t border-sand pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-espresso text-ivory py-20">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col gap-6">
          <h3 className="font-cormorant text-5xl">Ready to Start Your Ritual?</h3>
          <p className="font-dm text-ivory/70 max-w-md mx-auto">
            Discover science-backed formulations designed to transform your skin over time.
          </p>
          <Link
            to="/products"
            className="self-center bg-gold text-espresso font-dm text-xs tracking-widest uppercase px-10 py-4 hover:bg-ivory transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

    </div>
  )
}