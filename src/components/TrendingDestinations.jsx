import { Link } from 'react-router-dom'

const row1 = [
  { city: 'Ruhengeri', country: 'Rwanda', flag: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/images-flags/Rw.png', image: 'https://cf.bstatic.com/xdata/images/city/600x600/893241.jpg?k=4b220700a96f819284d2802eb8ba8a33e1b378958b261adc51c979219292a486&o=', properties: 42 },
  { city: 'Kigali', country: 'Rwanda', flag: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/images-flags/Rw.png', image: 'https://cf.bstatic.com/xdata/images/city/600x600/988915.jpg?k=988d6c027364d71a6065f5559281cf28f842fe0593098a80b8a8bf7e28a37721&o=', properties: 1454 },
]

const row2 = [
  { city: 'Santorini', country: 'Greece', flag: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/images-flags/Gr.png', image: 'https://cf.bstatic.com/xdata/images/city/600x600/655536.jpg?k=696e207f5e68e1c7055b19f46cde21a24d4eaea48a2f67c66c233a9b4ec5d70a&o=', properties: 491 },
  { city: 'Paris', country: 'France', flag: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/images-flags/Fr.png', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', properties: 1240 },
  { city: 'Bali', country: 'Indonesia', flag: 'https://t-cf.bstatic.com/design-assets/assets/v3.195.0/images-flags/Id.png', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', properties: 876 },
]

function DestCard({ city, country, flag, image, properties, aspect = '2/1' }) {
  return (
    <Link
      to={`/search?destination=${encodeURIComponent(city)}`}
      className="group relative rounded-lg overflow-hidden block cursor-pointer"
      style={{ aspectRatio: aspect }}
    >
      <img
        src={image}
        alt={city}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 p-3">
        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-base leading-tight drop-shadow">{city}</span>
          {flag && (
            <img src={flag} alt={country} className="w-5 h-5 object-cover rounded-sm" loading="lazy" />
          )}
        </div>
        <p className="text-white/90 text-xs mt-0.5 drop-shadow">{properties.toLocaleString()} properties</p>
      </div>
    </Link>
  )
}

export default function TrendingDestinations() {
  return (
    <section className="container-main py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Trending destinations</h2>
        <p className="text-muted text-sm mt-1">Travelers from your area also booked these</p>
      </div>

      {/* Row 1: 2 wide cards (2:1 ratio) */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {row1.map((d) => <DestCard key={d.city} {...d} aspect="2/1" />)}
      </div>

      {/* Row 2: 3 portrait cards (4:3 ratio) */}
      <div className="grid grid-cols-3 gap-2">
        {row2.map((d) => <DestCard key={d.city} {...d} aspect="4/3" />)}
      </div>
    </section>
  )
}
