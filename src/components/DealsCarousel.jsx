import { useState } from 'react'
import { Link } from 'react-router-dom'
import properties from '../data/properties.json'
import { formatPrice } from '../utils/helpers'

const discounts = [20, 15, 25, 18, 30, 12]

function HeartButton() {
  const [liked, setLiked] = useState(false)
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); setLiked((v) => !v) }}
      className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow"
      aria-label="Save to wishlist"
    >
      <svg className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
      </svg>
    </button>
  )
}

export default function DealsCarousel() {
  const deals = properties.slice(0, 6)
  const [start, setStart] = useState(0)
  const visible = 3
  const canPrev = start > 0
  const canNext = start + visible < deals.length

  return (
    <section className="py-10">
      <div className="container-main">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Deals for the weekend</h2>
            <p className="text-muted text-sm mt-1">Save on stays for June 26 - June 28</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setStart((s) => Math.max(0, s - 1))}
              disabled={!canPrev}
              className="w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => setStart((s) => Math.min(deals.length - visible, s + 1))}
              disabled={!canNext}
              className="w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-colors shadow-sm"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.slice(start, start + visible).map((property, i) => {
            const discount = discounts[(start + i) % discounts.length]
            const original = Math.round(property.pricePerNight / (1 - discount / 100))
            return (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <HeartButton />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {property.name}
                  </p>
                  <p className="text-sm text-muted mt-0.5 mb-3">{property.location}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-muted line-through">{formatPrice(original)}</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatPrice(property.pricePerNight)}
                      <span className="text-xs font-normal text-muted"> / night</span>
                    </p>
                    <p className="text-xs text-success font-medium mt-0.5">
                      You save {formatPrice(original - property.pricePerNight)}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
