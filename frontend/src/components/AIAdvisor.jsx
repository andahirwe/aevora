import { useEffect, useRef, useState } from 'react'

const WELCOME_MSG = {
  role: 'assistant',
  text: "Hello! I'm your Aevora Skin Advisor. Describe your skin concerns and I'll recommend the perfect products for you. ✨"
}

export default function AIAdvisor({ isOpen, onClose }) {
  const [history, setHistory] = useState([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const prevOpenRef = useRef(false)

  // Reset history when modal opens — during render, not in effect
  if (isOpen && !prevOpenRef.current) {
    prevOpenRef.current = true
    if (history.length > 1) setHistory([WELCOME_MSG])
  }
  if (!isOpen && prevOpenRef.current) {
    prevOpenRef.current = false
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [history, loading])

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setHistory(h => [...h, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const t = text.toLowerCase()
      const reply =
        t.includes('dry') || t.includes('dehydr')
          ? 'For dry and dehydrated skin, I recommend the Aura Hydration Essence ($68) for deep barrier hydration, paired with Barrier Shield Cream ($58) to lock in moisture. For best results, try the Aevora Complete Ritual ($229).'
        : t.includes('oily') || t.includes('acne') || t.includes('breakout')
          ? 'For oily or acne-prone skin, start with the Purity Foam Cleanser ($34) to balance sebum, then the Cell-Reset Serum ($78) to regulate and renew skin cells.'
        : t.includes('dark circle') || t.includes('eye') || t.includes('puff')
          ? 'For the eye area, the Lumi Eye Concentrate ($65) firms and brightens, while the Dark Circle Eye Serum ($59) targets pigmentation directly under the eyes.'
        : t.includes('glow') || t.includes('dull') || t.includes('bright')
          ? 'For radiance, the Vitamin C Brightening Serum ($82) is your hero product. Pair it with Micellar Cleansing Water ($28) for a fresh, glowing base.'
        : t.includes('aging') || t.includes('wrinkle') || t.includes('fine line')
          ? 'For anti-aging, the Peptide Renewal Serum ($88) stimulates collagen production, and the Overnight Repair Mask ($55) accelerates cellular recovery while you sleep.'
        : t.includes('sensitive') || t.includes('redness') || t.includes('irritate')
          ? 'For sensitive skin, the Barrier Shield Cream ($58) calms and protects, and the Purity Foam Cleanser ($34) gently cleanses without stripping the skin.'
        : t.includes('sun') || t.includes('spf') || t.includes('protect')
          ? 'For daily protection, the SPF 50 Defense Fluid ($48) shields against UV damage while keeping skin light and breathable.'
        : 'For a complete skin transformation, I recommend the Aevora Complete Ritual ($229) — our full 4-step skin fitness system covering cleansing, activation, recovery, and maintenance. It is our best value.'

      setHistory(h => [...h, { role: 'assistant', text: reply }])
    } catch {
      setHistory(h => [...h, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-espresso/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="w-full max-w-2xl bg-ivory rounded-t-2xl shadow-2xl flex flex-col max-h-[80vh]">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sand">
            <div>
              <h3 className="font-cormorant text-2xl text-espresso">AI Skin Advisor</h3>
              <p className="font-dm text-xs text-taupe tracking-widest uppercase">Powered by Aevora Science</p>
            </div>
            <button onClick={onClose} className="p-2 hover:opacity-60 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-espresso" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {history.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-dm text-xs font-semibold ${
                  m.role === 'user' ? 'bg-mocha text-ivory' : 'bg-gold text-espresso'
                }`}>
                  {m.role === 'user' ? 'U' : 'A'}
                </div>
                <div className={`max-w-xs md:max-w-md px-4 py-3 font-dm text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-mocha text-ivory' : 'bg-cream text-espresso'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex-shrink-0 flex items-center justify-center font-dm text-xs font-semibold text-espresso">A</div>
                <div className="bg-cream px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-taupe rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="px-6 py-4 border-t border-sand flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. I have dry skin and dark circles..."
              className="flex-1 border border-sand px-4 py-3 font-dm text-sm text-espresso bg-ivory focus:outline-none focus:border-mocha transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-mocha text-ivory font-dm text-xs tracking-widest uppercase px-6 py-3 hover:bg-espresso transition-colors disabled:opacity-50"
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}