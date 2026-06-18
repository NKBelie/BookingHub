import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const serviceTabs = [
    {
        to: '/search', label: 'Stays',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    },
    {
        to: '/search?type=flight', label: 'Flights',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
    },
    {
        to: '/search?type=car', label: 'Car rentals',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
    },
    {
        to: '/search?type=attraction', label: 'Attractions',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>
    },
    {
        to: '/search?type=taxi', label: 'Airport taxis',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
    },
    ]

    export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-primary">
        <div className="container-main">
            {/* Top row: logo + auth */}
            <div className="flex items-center justify-between py-3">
            <Link to="/" className="flex items-center gap-0.5 shrink-0">
                <span className="text-white font-bold text-[22px] tracking-tight leading-none">Booking.com</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
                <button className="flex items-center gap-1 text-white text-sm font-medium px-2 py-1.5 rounded hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" /></svg>
                EN
                </button>
                <button className="text-white text-sm font-medium px-2.5 py-1.5 rounded hover:bg-white/10 transition-colors">
                USD
                </button>
                <div className="w-px h-5 bg-white/30 mx-1" />
                <Link to="#" className="text-white/90 text-sm font-medium px-2.5 py-1.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
                List your property
                </Link>
                <Link to="/login" className="text-white text-sm font-semibold px-3 py-1.5 border border-white/70 rounded hover:bg-white/10 transition-colors">
                Sign in
                </Link>
                <Link to="/signup" className="bg-white text-primary text-sm font-semibold px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                Register
                </Link>
            </div>

            <button
                type="button"
                className="md:hidden p-2 text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen
                ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                }
            </button>
            </div>

            {/* Service tabs — flush at bottom of header */}
            <div className="hidden md:flex items-center overflow-x-auto">
            {serviceTabs.map(({ to, label, icon }) => (
                <NavLink
                key={label}
                to={to}
                end={to === '/search'}
                className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                        ? 'border-white text-white'
                        : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                    }`
                }
                >
                {icon}
                {label}
                </NavLink>
            ))}
            </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
            <div className="md:hidden bg-primary-dark border-t border-white/10 pb-4">
            <nav className="container-main flex flex-col pt-2">
                {serviceTabs.map(({ to, label, icon }) => (
                <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-2 py-3 text-white/90 hover:bg-white/10 rounded text-sm font-medium"
                >
                    {icon}
                    {label}
                </NavLink>
                ))}
                <div className="flex flex-col gap-2 pt-4 px-2 border-t border-white/10 mt-2">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full text-white text-sm font-semibold py-2.5 border border-white/70 rounded hover:bg-white/10 transition-colors">
                    Sign in
                    </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <button className="w-full bg-white text-primary text-sm font-semibold py-2.5 rounded hover:bg-gray-100 transition-colors">
                    Register
                    </button>
                </Link>
                </div>
            </nav>
            </div>
        )}
        </header>
    )
}
