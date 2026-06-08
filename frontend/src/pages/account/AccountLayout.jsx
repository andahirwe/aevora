import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AccountLayout() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Member'

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-sand bg-ivory p-6 shadow-sm shadow-espresso/5">
          <div className="mb-8">
            <p className="font-dm text-xs uppercase tracking-[0.35em] text-taupe">Account</p>
            <h2 className="mt-3 text-3xl font-cormorant text-espresso">Welcome back, {firstName}</h2>
          </div>
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/account"
              end
              className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${isActive ? 'bg-gold/10 text-espresso' : 'text-taupe hover:bg-gold/5 hover:text-espresso'}`}
            >
              Overview
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${isActive ? 'bg-gold/10 text-espresso' : 'text-taupe hover:bg-gold/5 hover:text-espresso'}`}
            >
              Orders
            </NavLink>
            <NavLink
              to="/account/profile"
              className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${isActive ? 'bg-gold/10 text-espresso' : 'text-taupe hover:bg-gold/5 hover:text-espresso'}`}
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/security"
              className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${isActive ? 'bg-gold/10 text-espresso' : 'text-taupe hover:bg-gold/5 hover:text-espresso'}`}
            >
              Security
            </NavLink>
          </nav>
        </aside>

        <div className="rounded-3xl border border-sand bg-white p-8 shadow-sm shadow-espresso/5">
          <Outlet />
        </div>
      </div>
    </section>
  )
}
