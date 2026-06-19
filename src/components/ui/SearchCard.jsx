import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'
export default function SearchCard({ compact = false, className = '' }) {
    const navigate = useNavigate()
    const { destination, checkIn, checkOut, guests, updateSearch } = useSearch()
    const [showGuests, setShowGuests] = useState(false)
    const [localDest, setLocalDest] = useState(destination)
    const [localCheckIn, setLocalCheckIn] = useState(checkIn)
    const [localCheckOut, setLocalCheckOut] = useState(checkOut)
    const [localGuests, setLocalGuests] = useState(guests)

    const handleSearch = (e) => {
        e.preventDefault()
        updateSearch({
        destination: localDest,
        checkIn: localCheckIn,
        checkOut: localCheckOut,
        guests: localGuests,
        })
        navigate('/search')
    }

    const guestLabel = `${localGuests.adults} adult${localGuests.adults !== 1 ? 's' : ''}${
        localGuests.children > 0
        ? ` · ${localGuests.children} child${localGuests.children !== 1 ? 'ren' : ''}`
        : ''
    } · ${localGuests.rooms} room${localGuests.rooms !== 1 ? 's' : ''}`

    return (
        <form
        onSubmit={handleSearch}
        className={`bg-accent rounded-lg p-1 shadow-lg ${compact ? '' : 'w-full'} ${className}`}
        >
        <div
            className={`flex flex-col gap-1 ${
            compact ? 'md:flex-row md:items-stretch' : 'lg:flex-row lg:items-stretch'
            }`}
        >
            <div className={`flex-1 bg-white rounded-md ${compact ? 'p-3' : 'p-4'} relative`}>
            <label htmlFor="destination" className="block text-xs font-semibold text-gray-700 mb-1">
                Where are you going?
            </label>
            <input
                id="destination"
                type="text"
                placeholder="City, property, or destination"
                value={localDest}
                onChange={(e) => setLocalDest(e.target.value)}
                className="w-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
            </div>

            <div
            className={`flex flex-col sm:flex-row gap-1 ${
                compact ? 'md:flex-row' : 'lg:flex-row'
            }`}
            >
            <div className={`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} sm:flex-1`}>
                <label htmlFor="checkin" className="block text-xs font-semibold text-gray-700 mb-1">
                Check-in
                </label>
                <input
                id="checkin"
                type="date"
                value={localCheckIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLocalCheckIn(e.target.value)}
                className="w-full text-sm text-gray-900 focus:outline-none bg-transparent"
                />
            </div>

            <div className={`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} sm:flex-1`}>
                <label htmlFor="checkout" className="block text-xs font-semibold text-gray-700 mb-1">
                Check-out
                </label>
                <input
                id="checkout"
                type="date"
                value={localCheckOut}
                min={localCheckIn}
                onChange={(e) => setLocalCheckOut(e.target.value)}
                className="w-full text-sm text-gray-900 focus:outline-none bg-transparent"
                />
            </div>
            </div>

            <div className="relative">
            <div
                className={`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} h-full cursor-pointer`}
                onClick={() => setShowGuests(!showGuests)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setShowGuests(!showGuests)}
            >
                <span className="block text-xs font-semibold text-gray-700 mb-1">Guests</span>
                <span className="text-sm text-gray-900">{guestLabel}</span>
            </div>

            {showGuests && (
                <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-lg shadow-xl border border-border p-4 w-72">
                {[
                    { key: 'adults', label: 'Adults', min: 1, max: 10 },
                    { key: 'children', label: 'Children', min: 0, max: 10 },
                    { key: 'rooms', label: 'Rooms', min: 1, max: 10 },
                ].map(({ key, label, min, max }) => (
                    <div key={key} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">{label}</span>
                    <div className="flex items-center gap-3">
                        <button
                        type="button"
                        onClick={() =>
                            setLocalGuests((g) => ({
                            ...g,
                            [key]: Math.max(min, g[key] - 1),
                            }))
                        }
                        className="w-8 h-8 rounded border border-primary text-primary hover:bg-blue-50 transition-colors"
                        disabled={localGuests[key] <= min}
                        >
                        −
                        </button>
                        <span className="w-6 text-center text-sm">{localGuests[key]}</span>
                        <button
                        type="button"
                        onClick={() =>
                            setLocalGuests((g) => ({
                            ...g,
                            [key]: Math.min(max, g[key] + 1),
                            }))
                        }
                        className="w-8 h-8 rounded border border-primary text-primary hover:bg-blue-50 transition-colors"
                        disabled={localGuests[key] >= max}
                        >
                        +
                        </button>
                    </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setShowGuests(false)}
                    className="w-full mt-2 py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-light transition-colors"
                >
                    Done
                </button>
                </div>
            )}
            </div>

            <button
            type="submit"
            className={`bg-primary text-white font-semibold rounded-md hover:bg-primary-light transition-colors duration-200 ${
                compact ? 'px-6 py-3' : 'px-8 py-4 text-base'
            }`}
            >
            Search
            </button>
        </div>
        </form>
    )
}
