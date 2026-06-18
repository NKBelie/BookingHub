import SearchCard from './ui/SearchCard'

export default function HeroSection() {
    return (
        <>
        {/* Hero — flat navy, no background image (matches real Booking.com) */}
        <section className="bg-primary">
            <div className="container-main pt-10 pb-28 lg:pt-12 lg:pb-32">
            <h1 className="text-3xl sm:text-[32px] font-bold text-white mb-2 leading-tight">
                Find your next stay
            </h1>
            <p className="text-white text-sm lg:text-base">
                Search deals on hotels, homes, and much more...
            </p>
            </div>
        </section>

        {/* Search card overlaps the hero from below */}
        <div className="container-main -mt-16 z-10 relative pb-6">
            <SearchCard />
        </div>
        </>
    )
}
