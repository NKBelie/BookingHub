import { Link } from 'react-router-dom'
import StarRating from './ui/StarRating'
import RatingBadge from './ui/RatingBadge'
import { formatPrice } from '../utils/helpers'

export default function PropertyCard({ property, layout = 'horizontal' }) {
    const isVertical = layout === 'vertical'

    return (
        <Link
        to={`/property/${property.id}`}
        className={`group flex bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
            isVertical ? 'flex-col' : 'flex-col sm:flex-row'
        }`}
        >
        <div
            className={`relative overflow-hidden shrink-0 ${
            isVertical ? 'aspect-4/3' : 'sm:w-72 lg:w-80 aspect-4/3 sm:aspect-auto sm:h-auto'
            }`}
        >
            <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            />
        </div>

        <div className="flex flex-1 p-4 gap-4">
            <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
                <div>
                <h3 className="font-bold text-primary text-lg group-hover:underline leading-snug">
                    {property.name}
                </h3>
                <p className="text-sm text-primary-light mt-0.5">{property.location}</p>
                </div>
                {!isVertical && (
                <div className="hidden sm:block shrink-0">
                    <RatingBadge rating={property.rating} />
                </div>
                )}
            </div>

            <StarRating stars={property.stars} />

            <p className="text-sm text-muted mt-2 line-clamp-2">{property.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
                {property.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity} className="text-xs bg-surface text-muted px-2 py-1 rounded">
                    {amenity}
                </span>
                ))}
            </div>
            </div>

            <div
            className={`flex flex-col items-end justify-between shrink-0 ${
                isVertical ? 'flex-row items-center pt-2 border-t border-border' : ''
            }`}
            >
            {isVertical && <RatingBadge rating={property.rating} />}
            <div className={`text-right ${isVertical ? '' : 'mt-auto'}`}>
                <p className="text-xs text-muted">1 night</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(property.pricePerNight)}</p>
                <p className="text-xs text-muted">Includes taxes and fees</p>
            </div>
            </div>
        </div>
        </Link>
    )
}
