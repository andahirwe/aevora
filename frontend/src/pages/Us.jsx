import { Link } from 'react-router-dom'

export default function Us() {
  return (
    <div className="min-h-screen bg-ivory text-espresso">
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-4">We Are Aevora</p>
          <h1 className="font-cormorant text-5xl md:text-6xl">We Are Aevora</h1>
          <p className="font-dm text-base text-taupe mt-6 max-w-3xl mx-auto leading-relaxed">
            Founded on the belief that skincare should work like fitness — consistent, science-backed, and progressive. Every ritual is designed to improve skin performance over time.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 px-6">
        <div className="max-w-5xl mx-auto grid gap-10">
          <div className="bg-ivory border border-sand p-8 rounded-3xl shadow-sm">
            <h2 className="font-cormorant text-3xl text-espresso mb-4">Our Story</h2>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              Aevora was born to make advanced skincare accessible and intentional. We blend powerful actives with elegant textures so every step feels purposeful and effective.
            </p>
          </div>

          <div className="bg-ivory border border-sand p-8 rounded-3xl shadow-sm">
            <h2 className="font-cormorant text-3xl text-espresso mb-4">Mission</h2>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              Our mission is to deliver skincare that strengthens, restores, and refines skin over time — rooted in research, proven in ritual.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="bg-cream border border-sand p-8 rounded-3xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-espresso font-bold">S</div>
            <h3 className="font-cormorant text-2xl text-espresso mt-6 mb-3">Science</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              Every formula is built on active research and ingredient clarity.
            </p>
          </div>
          <div className="bg-cream border border-sand p-8 rounded-3xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-espresso font-bold">I</div>
            <h3 className="font-cormorant text-2xl text-espresso mt-6 mb-3">Integrity</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              We believe in transparency, efficacy, and skincare that honors the skin’s needs.
            </p>
          </div>
          <div className="bg-cream border border-sand p-8 rounded-3xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-espresso font-bold">R</div>
            <h3 className="font-cormorant text-2xl text-espresso mt-6 mb-3">Results</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              Our products are crafted to deliver visible, lasting improvements with each ritual.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-cormorant text-4xl text-espresso mb-6">Meet the team</h2>
          <p className="font-dm text-sm text-taupe leading-relaxed mb-8">
            Our team is the quiet engine behind every formula, blending expertise in skincare science, formulation, and user-first design.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-sand bg-ivory p-8">Team member profiles coming soon.</div>
            <div className="rounded-3xl border border-sand bg-ivory p-8">Team member profiles coming soon.</div>
            <div className="rounded-3xl border border-sand bg-ivory p-8">Team member profiles coming soon.</div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 text-center">
        <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-mocha px-8 py-4 text-xs uppercase tracking-widest font-dm text-ivory hover:bg-espresso transition-colors">
          Shop the Collection
        </Link>
      </section>
    </div>
  )
}
