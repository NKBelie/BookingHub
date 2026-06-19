import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import PropertyTypeTabs from '../components/PropertyTypeTabs'
import TrendingDestinations from '../components/TrendingDestinations'
import DealsCarousel from '../components/DealsCarousel'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'

const featured = properties.slice(0, 4)

const usps = [
    {
        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=160&h=160&fit=crop&q=80',
        title: 'Book now, pay at the property',
        sub: 'FREE cancellation on most rooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=160&h=160&fit=crop&q=80',
        title: '300M+ reviews from fellow travelers',
        sub: 'Get trusted information from guests like you',
    },
    {
        img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=160&h=160&fit=crop&q=80',
        title: '2+ million properties worldwide',
        sub: 'Hotels, guest houses, apartments, and more…',
    },
    {
        img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=160&h=160&fit=crop&q=80',
        title: 'Trusted 24/7 customer service',
        sub: "We're always here to help",
    },
    ]

    export default function HomePage() {
    const [activeType, setActiveType] = useState('')

    const filtered = activeType
        ? properties.filter((p) => p.type === activeType).slice(0, 4)
        : featured

    return (
        <>
        <HeroSection />

        <div className="px-58">
            <input type="checkbox" name="" id="" />
            <span> I'm travelling for work</span>
        </div>
        {/* USP strip — matches Booking.com's 4-card horizontal layout */}
        <div className="border-b border-border">
            <div className="container-main py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {usps.map(({ img, title, sub }) => (
                <div key={title} className="flex flex-col bg-white rounded-lg border border-border p-4">
                    <img src={img} alt={title} className="w-20 h-20 object-cover rounded-lg mb-3" loading="lazy" />
                    <p className="font-bold text-sm text-gray-900 leading-snug">{title}</p>
                    <p className="text-xs text-muted mt-1">{sub}</p>
                </div>
                ))}
            </div>
            </div>
        </div>

        <TrendingDestinations />

        <DealsCarousel />

        {/* Homes guests love */}
        <section className="container-main py-6 pb-12">
            <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Homes guests love</h2>
            </div>
            <Link to="/search" className="text-sm text-[#0071c2] hover:underline font-medium">
                Discover homes
            </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} layout="vertical" />
            ))}
            {filtered.length === 0 && (
                <p className="col-span-4 text-center text-muted py-10 text-sm">No properties found for this type.</p>
            )}
            </div>
        </section>
        </>
    )
}
