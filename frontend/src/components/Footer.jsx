import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border-2 border-gold flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>
              </div>
              <span className="font-cormorant text-2xl tracking-widest uppercase">Aevora</span>
            </div>
            <p className="font-dm text-sm text-ivory/60 leading-relaxed max-w-xs">
              Timeless Science. Radiant Skin. Skincare engineered for how your skin lives.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="font-dm text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                className="font-dm text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors">
                TikTok
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-dm text-xs tracking-widest uppercase text-ivory/40">Navigate</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-dm text-sm text-ivory/70 hover:text-gold transition-colors">Home</Link>
              <Link to="/products" className="font-dm text-sm text-ivory/70 hover:text-gold transition-colors">Shop</Link>
              <Link to="/login" className="font-dm text-sm text-ivory/70 hover:text-gold transition-colors">Account</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-dm text-xs tracking-widest uppercase text-ivory/40">Stay in the ritual</h4>
            <p className="font-dm text-sm text-ivory/60">Subscribe for skincare insights and new arrivals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-ivory/20 px-4 py-2 font-dm text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-espresso px-4 py-2 font-dm text-xs tracking-widest uppercase hover:bg-ivory transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-ivory/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-dm text-xs text-ivory/30">© 2026 Aevora. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="font-dm text-xs text-ivory/30 hover:text-ivory/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="font-dm text-xs text-ivory/30 hover:text-ivory/60 cursor-pointer transition-colors">Terms & Conditions</span>
            <span className="font-dm text-xs text-ivory/30 hover:text-ivory/60 cursor-pointer transition-colors">Return Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}// TODO: implement
