import HeroSection from '../components/HeroSection'
import PropertyTypeTabs from '../components/PropertyTypeTabs'
import TrendingDestinations from '../components/TrendingDestinations'
import DealsCarousel from '../components/DealsCarousel'

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
    return (
        <>
        <HeroSection />

        <div className="container-main pt-3 pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-fit">
            <input type="checkbox" className="accent-[#0071c2]" />
            I'm travelling for work
            </label>
        </div>
        <div className="container-main text-2xl font-bold">
            <h1>Why Booking.com </h1>
        </div>

        {/* USP strip */}
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

        <PropertyTypeTabs />
        </>
    )
}
