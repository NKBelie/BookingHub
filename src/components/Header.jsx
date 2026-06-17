import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../components/Button'

const navLinks = [
    { to: '/', label: 'Stays' },
    { to: '/search', label: 'Search' },
    { to: '/search?type=resort', label: 'Deals' },
    ]

    export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-primary shadow-md">
        <div className="container-main">
            <div className="flex items-center justify-between h-16 lg:h-18">
            <Link to="/" className="flex items-center gap-2 shrink-0">
                <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                Booking.com
                </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
                {navLinks.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                        isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`
                    }
                >
                    {label}
                </NavLink>
                ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Sign in
                </Button>
                </Link>
                <Link to="/signup">
                <Button variant="white" size="sm">
                    Register
                </Button>
                </Link>
            </div>

            <button
                type="button"
                className="md:hidden p-2 text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                )}
            </button>
            </div>
        </div>

        {menuOpen && (
            <div className="md:hidden bg-primary-dark border-t border-white/10 pb-4">
            <nav className="container-main flex flex-col gap-1 pt-2">
                {navLinks.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-white/90 hover:bg-white/10 rounded text-sm font-medium"
                >
                    {label}
                </NavLink>
                ))}
                <div className="flex flex-col gap-2 pt-3 px-4">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" size="md" className="w-full border-white text-white hover:bg-white hover:text-primary">
                    Sign in
                    </Button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button variant="white" size="md" className="w-full">
                    Register
                    </Button>
                </Link>
                </div>
            </nav>
            </div>
        )}
        </header>
    )
}
