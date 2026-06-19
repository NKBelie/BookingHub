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
        img: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/illustrations-traveller/FreeCancellation.png',
        title: 'Book now, pay at the property',
        sub: 'FREE cancellation on most rooms',
    },
    {
        img: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/illustrations-traveller/Reviews.png',
        title: '300M+ reviews from fellow travelers',
        sub: 'Get trusted information from guests like you',
    },
    {
        img: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/illustrations-traveller/TripsGlobe.png',
        title: '2+ million properties worldwide',
        sub: 'Hotels, guest houses, apartments, and more…',
    },
    {
        img: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/illustrations-traveller/CustomerSupport.png',
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

        <div className="container-main">
            <input type="checkbox" name="" id="" />
            <span> I'm travelling for work</span>
        </div>
        <div className="container-main py-6 text-3xl font-bold">
            <h1>Why Booking.com</h1>
        </div>
        {/* USP strip — matches Booking.com's 4-card horizontal layout */}
        <div className="border-b border-border">
            <div className="container-main py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {usps.map(({ img, title, sub }) => (
                <div key={title} className="flex flex-col bg-white rounded-lg border border-border p-4">
                    <img src={img} alt={title} className="w-20 h-20 object-contain mb-3" loading="lazy" />
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
