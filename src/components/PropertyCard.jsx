import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/helpers'

function getRatingLabel(score) {
  if (score >= 9) return 'Exceptional'
  if (score >= 8) return 'Excellent'
  if (score >= 7) return 'Very Good'
  if (score >= 6) return 'Good'
  return 'Okay'
}

function HeartButton() {
  const [liked, setLiked] = useState(false)
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); setLiked((v) => !v) }}
      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow"
      aria-label="Save to wishlist"
    >
      <svg className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
      </svg>
    </button>
  )
}

function ScoreBadge({ score, reviewCount, small = false }) {
  return (
    <div className={`flex items-center gap-1.5 ${small ? '' : 'flex-row-reverse'}`}>
      <div className={small ? '' : 'text-right'}>
        <p className="font-bold text-gray-900 leading-none text-xs">{getRatingLabel(parseFloat(score))}</p>
        <p className="text-[10px] text-muted">{reviewCount.toLocaleString()} reviews</p>
      </div>
      <span className="bg-[#003580] text-white font-bold px-1.5 py-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg leading-none text-sm shrink-0">
        {score}
      </span>
    </div>
  )
}

export default function PropertyCard({ property, layout = 'horizontal' }) {
  const isVertical = layout === 'vertical'
  const score = (property.rating * 2).toFixed(1)
  const cheapestRoom = property.roomTypes?.[0]
  const originalPrice = Math.round(property.pricePerNight * 1.18)

  if (isVertical) {
    return (
      <Link
        to={`/property/${property.id}`}
        className="group flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {property.stars >= 4 && (
            <span className="absolute top-2 left-2 bg-[#003580] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              Genius
            </span>
          )}
          <HeartButton />
        </div>

        <div className="flex flex-col flex-1 p-3 gap-1">
          <h3 className="font-bold text-[#0071c2] text-sm leading-snug group-hover:underline line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: property.stars }, (_, i) => (
              <svg key={i} className="w-2.5 h-2.5 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-[#0071c2] flex items-center gap-0.5 truncate">
            <svg className="w-2.5 h-2.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {property.location}
          </p>
          {cheapestRoom && <p className="text-xs text-gray-600 truncate">{cheapestRoom.name}</p>}
          <p className="text-xs text-[#008234] font-semibold">✓ Free cancellation</p>
          <div className="flex items-end justify-between gap-2 mt-auto pt-2 border-t border-border">
            <ScoreBadge score={score} reviewCount={property.reviewCount} small />
            <div className="text-right">
              <p className="text-[10px] text-muted line-through">{formatPrice(originalPrice)}</p>
              <p className="text-base font-bold text-gray-900 leading-tight">{formatPrice(property.pricePerNight)}</p>
              <p className="text-[10px] text-muted">per night</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/property/${property.id}`}
      className="group flex flex-col sm:flex-row bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative shrink-0 w-full sm:w-56 lg:w-64 aspect-[4/3] sm:aspect-auto overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {property.stars >= 4 && (
          <span className="absolute top-2 left-2 bg-[#003580] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            Genius
          </span>
        )}
        <HeartButton />
      </div>

      <div className="flex flex-1 flex-col sm:flex-row min-w-0">
        <div className="flex-1 min-w-0 p-4">
          <h3 className="font-bold text-[#0071c2] text-base leading-snug group-hover:underline">
            {property.name}
          </h3>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: property.stars }, (_, i) => (
              <svg key={i} className="w-3 h-3 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <svg className="w-3 h-3 text-[#0071c2] shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-[#0071c2] underline">{property.location}</span>
            <span className="text-xs text-gray-500">— Excellent location</span>
          </div>
          {cheapestRoom && <p className="text-xs font-semibold text-gray-800 mt-2">{cheapestRoom.name}</p>}
          <p className="text-xs text-gray-500 mt-0.5">{cheapestRoom?.capacity === 1 ? '1 bed' : `${cheapestRoom?.capacity ?? 2} beds`}</p>
          <div className="mt-2 space-y-0.5">
            <p className="text-xs text-[#008234] font-semibold">✓ Free cancellation</p>
            <p className="text-xs text-[#008234]">No prepayment needed – pay at the property</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 px-4 pb-4 sm:pt-4 sm:pl-0 sm:w-40 shrink-0 border-t sm:border-t-0 sm:border-l border-border">
          <ScoreBadge score={score} reviewCount={property.reviewCount} />
          <div className="text-right sm:mt-auto">
            <p className="text-xs text-muted line-through">{formatPrice(originalPrice)}</p>
            <p className="text-xl font-bold text-gray-900 leading-tight">{formatPrice(property.pricePerNight)}</p>
            <p className="text-[11px] text-muted">per night</p>
            <p className="text-[11px] text-muted">Includes taxes &amp; fees</p>
            <button className="mt-2 w-full bg-[#0071c2] hover:bg-[#005fa3] text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors">
              See availability
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
