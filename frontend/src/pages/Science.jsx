import { Link } from 'react-router-dom'

export default function Science() {
  return (
    <div className="min-h-screen bg-ivory text-espresso">
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-4">The Science of Aevora</p>
          <h1 className="font-cormorant text-5xl md:text-6xl">The Science of Aevora</h1>
          <p className="font-dm text-base text-taupe mt-6 max-w-3xl mx-auto leading-relaxed">
            Aevora blends powerful biotechnology and functional ingredients in an elegant ritual designed to strengthen, restore, and refine skin at every stage.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
          <div className="bg-ivory border border-sand p-8 rounded-3xl shadow-sm">
            <p className="font-dm text-xs tracking-widest uppercase text-gold mb-3">PDRN</p>
            <h2 className="font-cormorant text-3xl text-espresso mb-4">What it is</h2>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              PDRN is a regenerating ingredient derived from natural DNA fragments, celebrated for its ability to accelerate repair and support skin resilience.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">What it does</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              It boosts recovery, improves texture, and helps restore a healthy barrier after environmental stress.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">Why Aevora</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              We use PDRN to deliver clinically inspired repair and support a progressive path to stronger skin.
            </p>
          </div>

          <div className="bg-ivory border border-sand p-8 rounded-3xl shadow-sm">
            <p className="font-dm text-xs tracking-widest uppercase text-gold mb-3">Peptides</p>
            <h2 className="font-cormorant text-3xl text-espresso mb-4">What it is</h2>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              Peptides are precision actives that communicate with skin cells to support firmness, hydration, and surface renewal.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">What it does</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              They help smooth fine lines, strengthen skin architecture, and improve elasticity with continued use.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">Why Aevora</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              Our formulas use targeted peptide blends to promote resilience without heaviness or irritation.
            </p>
          </div>

          <div className="bg-ivory border border-sand p-8 rounded-3xl shadow-sm">
            <p className="font-dm text-xs tracking-widest uppercase text-gold mb-3">Ceramides</p>
            <h2 className="font-cormorant text-3xl text-espresso mb-4">What it is</h2>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              Ceramides are skin-identical lipids that reinforce the surface barrier and lock in moisture for a calm, balanced complexion.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">What it does</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed mb-4">
              They reduce dryness, support barrier integrity, and help skin defend against irritation.
            </p>
            <h3 className="font-cormorant text-xl text-espresso mb-2">Why Aevora</h3>
            <p className="font-dm text-sm text-taupe leading-relaxed">
              We include ceramides to ensure every ritual strengthens skin from the inside out.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-dm text-xs tracking-widest uppercase text-taupe mb-4">Explore the collection</p>
          <h2 className="font-cormorant text-4xl text-espresso mb-6">Grounded in science, designed for ritual.</h2>
          <Link to="/products" className="inline-flex items-center justify-center rounded-full bg-mocha px-8 py-4 text-xs uppercase tracking-widest font-dm text-ivory hover:bg-espresso transition-colors">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
