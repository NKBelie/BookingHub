import { Link } from 'react-router-dom'

const columns = [
    {
        title: 'Support',
        links: ['Help Center', 'Safety information', 'Cancellation options', 'Report a concern', 'Contact us'],
    },
    {
        title: 'Discover',
        links: ['Trending destinations', 'Weekend getaways', 'Beach resorts', 'City breaks', 'Mountain retreats', 'Unique stays'],
    },
    {
        title: 'Terms & policies',
        links: ['Privacy Policy', 'Cookie Policy', 'Terms & Conditions', 'Accessibility', 'Modern Slavery Statement'],
    },
    {
        title: 'Partners',
        links: ['List your property', 'Become an affiliate', 'Partner Hub', 'Extranet login', 'Connect API'],
    },
    {
        title: 'About Booking.com',
        links: ['About us', 'How we work', 'Sustainability', 'Press center', 'Careers', 'Investor relations'],
    },
    ]

    export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-border mt-auto">
        {/* Main columns */}
        <div className="container-main py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {columns.map(({ title, links }) => (
                <div key={title}>
                <h4 className="font-bold text-sm text-gray-900 mb-3">{title}</h4>
                <ul className="space-y-2">
                    {links.map((label) => (
                    <li key={label}>
                        <Link to="#" className="text-xs text-gray-600 hover:text-primary hover:underline transition-colors">
                        {label}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom bar */}
        <div className="container-main py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo + copyright */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                    <span className="text-white font-black text-sm">B</span>
                </div>
                <span className="text-primary font-bold text-base">Booking.com</span>
                <span className="text-accent font-black text-base">.</span>
                </div>
                <span className="text-xs text-gray-500">
                © {new Date().getFullYear()} Booking.com™. All rights reserved.
                </span>
            </div>

            {/* Language / Currency */}
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs text-gray-700 border border-border rounded px-3 py-1.5 hover:bg-white transition-colors bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.96 8.96 0 00.284 2.253" />
                </svg>
                English (UK)
                </button>
                <button className="flex items-center gap-1.5 text-xs text-gray-700 border border-border rounded px-3 py-1.5 hover:bg-white transition-colors bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                USD
                </button>
            </div>
            </div>
        </div>
        </footer>
    )
}
