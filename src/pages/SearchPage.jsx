import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import SearchCard from '../components/ui/SearchCard'
import properties from '../data/properties.json'

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price (low to high)' },
  { value: 'price_desc', label: 'Price (high to low)' },
  { value: 'rating', label: 'Top reviewed' },
]

const AMENITY_OPTIONS = ['Free WiFi', 'Pool', 'Breakfast included', 'Spa', 'Free parking', 'Kitchen']
const TYPES = ['hotel', 'apartment', 'resort', 'villa']

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type') || ''
  const initialDest = searchParams.get('destination') || ''

  const [sortBy, setSortBy] = useState('recommended')
  const [selectedType, setSelectedType] = useState(initialType)
  const [priceRange, setPriceRange] = useState(500)
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleAmenity = (a) =>
    setSelectedAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))

  const results = useMemo(() => {
    let list = [...properties]
    if (initialDest) list = list.filter((p) => p.location.toLowerCase().includes(initialDest.toLowerCase()) || p.name.toLowerCase().includes(initialDest.toLowerCase()))
    if (selectedType) list = list.filter((p) => p.type === selectedType)
    if (selectedAmenities.length) list = list.filter((p) => selectedAmenities.every((a) => p.amenities.includes(a)))
    list = list.filter((p) => p.pricePerNight <= priceRange)
    if (sortBy === 'price_asc') list.sort((a, b) => a.pricePerNight - b.pricePerNight)
    else if (sortBy === 'price_desc') list.sort((a, b) => b.pricePerNight - a.pricePerNight)
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [initialDest, selectedType, selectedAmenities, priceRange, sortBy])

  const Filters = () => (
    <aside className="space-y-6">
      {/* Property type */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Property type</h3>
        <div className="space-y-2">
          {TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType === t}
                onChange={() => setSelectedType(selectedType === t ? '' : t)}
                className="accent-primary"
              />
              <span className="text-sm capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Max price per night</h3>
        <input
          type="range"
          min={50}
          max={800}
          step={10}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-sm text-muted mt-1">Up to ${priceRange}</p>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
        <div className="space-y-2">
          {AMENITY_OPTIONS.map((a) => (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a)}
                onChange={() => toggleAmenity(a)}
                className="accent-primary"
              />
              <span className="text-sm">{a}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search bar */}
      <div className="bg-primary py-4">
        <div className="container-main">
          <SearchCard compact />
        </div>
      </div>

      <div className="container-main py-6">
        <div className="flex gap-6">
          {/* Desktop filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg border border-border p-5 sticky top-24">
              <Filters />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 gap-3">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">{results.length}</span> properties found
                {initialDest && ` in "${initialDest}"`}
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm bg-white hover:bg-gray-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2" />
                  </svg>
                  Filters
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-border">
                <p className="text-2xl mb-2">🔍</p>
                <p className="font-semibold text-gray-900">No properties found</p>
                <p className="text-muted text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} layout="horizontal" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-500 hover:text-gray-900">✕</button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </div>
  )
}
