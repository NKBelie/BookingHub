import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignupPage() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-primary font-bold text-xl">Booking.com</span>
        </Link>

        <div className="bg-white rounded-lg border border-border shadow-sm w-full max-w-sm p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-sm text-muted mb-6">Join millions of travellers on Booking.com.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
                <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={update('firstName')}
                    placeholder="Jane"
                    className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                </div>
                <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={update('lastName')}
                    placeholder="Doe"
                    className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                id="email"
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                id="password"
                type="password"
                value={form.password}
                onChange={update('password')}
                placeholder="Min. 8 characters"
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <p className="text-xs text-muted">
                By creating an account you agree to our{' '}
                <Link to="#" className="text-primary hover:underline">Terms</Link> and{' '}
                <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-md text-sm transition-colors"
            >
                Create account
            </button>
            </form>

            <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
        </div>
        </div>
    )
}
