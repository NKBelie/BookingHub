import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import properties from '../data/properties.json'
import StarRating from '../components/ui/StarRating'
import RatingBadge from '../components/ui/RatingBadge'
import { formatPrice, getTodayString, addDays, nightsBetween } from '../utils/helpers'
//import { useSearch } from '../components/context/SearchContext'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)
  const { checkIn, checkOut, guests } = useSearch()

  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [localCheckIn, setLocalCheckIn] = useState(checkIn || getTodayString())
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || addDays(getTodayString(), 3))
  const [localGuests, setLocalGuests] = useState(guests?.adults ?? 2)
  const [selectedRoom, setSelectedRoom] = useState(null)

  if (!property) {
    return (
      <div className="container-main py-20 text-center">
        <p className="text-2xl mb-2">🏨</p>
        <h1 className="text-xl font-bold mb-2">Property not found</h1>
        <Link to="/search" className="text-primary hover:underline text-sm">Back to search</Link>
      </div>
    )
  }

  const nights = nightsBetween(localCheckIn, localCheckOut)
  const roomPrice = selectedRoom ? selectedRoom.price : property.pricePerNight
  const total = roomPrice * nights

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container-main py-3 text-sm text-muted flex gap-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-primary">Search</Link>
          <span>/</span>
          <span className="text-gray-900">{property.name}</span>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <StarRating stars={property.stars} />
              <span className="text-sm text-muted">{property.location}</span>
            </div>
          </div>
          <RatingBadge rating={property.rating} />
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64 sm:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
          <div
            className="col-span-2 row-span-2 relative cursor-pointer"
            onClick={() => { setActiveImg(0); setLightbox(true) }}
          >
            <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover hover:opacity-95 transition-opacity" />
          </div>
          {property.images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="relative cursor-pointer overflow-hidden"
              onClick={() => { setActiveImg(i + 1); setLightbox(true) }}
            >
              <img src={img} alt={`${property.name} ${i + 2}`} className="w-full h-full object-cover hover:opacity-95 transition-opacity" loading="lazy" />
              {i === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">+{property.images.length - 5} photos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">✕</button>
            <button
              onClick={() => setActiveImg((i) => (i - 1 + property.images.length) % property.images.length)}
              className="absolute left-4 text-white text-3xl hover:text-gray-300"
            >‹</button>
            <img src={property.images[activeImg]} alt="" className="max-h-full max-w-full rounded-lg" />
            <button
              onClick={() => setActiveImg((i) => (i + 1) % property.images.length)}
              className="absolute right-4 text-white text-3xl hover:text-gray-300"
            >›</button>
            <p className="absolute bottom-4 text-white/70 text-sm">{activeImg + 1} / {property.images.length}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg border border-border p-5">
              <h2 className="font-bold text-lg text-gray-900 mb-3">About this property</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg border border-border p-5">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-success">✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Room types */}
            <div className="bg-white rounded-lg border border-border p-5">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Available rooms</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-semibold text-gray-700">Room type</th>
                      <th className="pb-3 font-semibold text-gray-700">Guests</th>
                      <th className="pb-3 font-semibold text-gray-700">Price/night</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.roomTypes.map((room) => (
                      <tr key={room.name} className={`border-b border-border last:border-0 ${selectedRoom?.name === room.name ? 'bg-blue-50' : ''}`}>
                        <td className="py-3 font-medium text-gray-900">{room.name}</td>
                        <td className="py-3 text-muted">{'👤'.repeat(room.capacity)}</td>
                        <td className="py-3 font-bold text-gray-900">{formatPrice(room.price)}</td>
                        <td className="py-3">
                          <button
                            onClick={() => setSelectedRoom(room)}
                            className={`px-4 py-1.5 rounded text-sm font-semibold transition-colors ${
                              selectedRoom?.name === room.name
                                ? 'bg-primary text-white'
                                : 'bg-accent text-primary hover:bg-accent-hover'
                            }`}
                          >
                            {selectedRoom?.name === room.name ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-bold text-lg text-gray-900">Guest reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-white text-sm font-bold px-2 py-0.5 rounded">
                    {property.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted">· {property.reviewCount} reviews</span>
                </div>
              </div>
              <div className="space-y-4">
                {property.reviews.map((review, i) => (
                  <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{review.author}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          {review.score}
                        </span>
                        <span className="text-xs text-muted">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking widget */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-lg border border-border p-5 sticky top-24">
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatPrice(roomPrice)}
                <span className="text-sm font-normal text-muted"> / night</span>
              </p>
              {selectedRoom && (
                <p className="text-xs text-primary mb-3">{selectedRoom.name}</p>
              )}
              <div className="border border-border rounded-lg overflow-hidden mb-3">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-3">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={localCheckIn}
                      min={getTodayString()}
                      onChange={(e) => setLocalCheckIn(e.target.value)}
                      className="w-full text-sm focus:outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={localCheckOut}
                      min={localCheckIn}
                      onChange={(e) => setLocalCheckOut(e.target.value)}
                      className="w-full text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="border-t border-border p-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Guests</label>
                  <select
                    value={localGuests}
                    onChange={(e) => setLocalGuests(Number(e.target.value))}
                    className="w-full text-sm focus:outline-none bg-transparent"
                  >
                    {[1,2,3,4,5,6].map((n) => (
                      <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-accent hover:bg-accent-hover text-primary font-bold py-3 rounded-lg transition-colors">
                Reserve
              </button>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>{formatPrice(roomPrice)} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>{formatPrice(roomPrice * nights)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Taxes &amp; fees</span>
                  <span>{formatPrice(Math.round(total * 0.12))}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(total + Math.round(total * 0.12))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
