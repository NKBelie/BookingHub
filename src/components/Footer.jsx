import { Link } from 'react-router-dom'

const footerColumns = [
    {
        title: 'Support',
        links: [
        { label: 'Help Center', to: '#' },
        { label: 'Safety information', to: '#' },
        { label: 'Cancellation options', to: '#' },
        { label: 'Contact us', to: '#' },
        ],
    },
    {
        title: 'Discover',
        links: [
        { label: 'Trending destinations', to: '/' },
        { label: 'Weekend getaways', to: '/search' },
        { label: 'Beach resorts', to: '/search?type=resort' },
        { label: 'City breaks', to: '/search?type=hotel' },
        ],
    },
    {
        title: 'BookStay',
        links: [
        { label: 'About us', to: '#' },
        { label: 'Careers', to: '#' },
        { label: 'Press center', to: '#' },
        { label: 'Partner with us', to: '#' },
        ],
    },
    ]

    export default function Footer() {
    return (
        <footer className="bg-primary-dark text-white mt-auto">
        <div className="container-main py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                    <span className="text-primary font-bold">B</span>
                </div>
                <span className="font-bold text-lg">BookStay</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                Find and book the perfect stay anywhere in the world. Your next adventure starts here.
                </p>
            </div>

            {footerColumns.map(({ title, links }) => (
                <div key={title}>
                <h4 className="font-semibold text-sm mb-4">{title}</h4>
                <ul className="space-y-2">
                    {links.map(({ label, to }) => (
                    <li key={label}>
                        <Link
                        to={to}
                        className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                        {label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
                © {new Date().getFullYear()} BookStay. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-white/60">
                <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
            </div>
        </div>
        </footer>
    )
}
