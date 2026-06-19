import { createContext, useContext, useState, useCallback } from 'react'
import { getTodayString, addDays } from '../utils/helpers'

const SearchContext = createContext(null)

const defaultGuests = { adults: 2, children: 0, rooms: 1 }

export function SearchProvider({ children }) {
    const [destination, setDestination] = useState('')
    const [checkIn, setCheckIn] = useState(getTodayString())
    const [checkOut, setCheckOut] = useState(addDays(getTodayString(), 3))
    const [guests, setGuests] = useState(defaultGuests)
    const [propertyType, setPropertyType] = useState('')
    const [sortBy, setSortBy] = useState('recommended')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedAmenities, setSelectedAmenities] = useState([])

    const updateSearch = useCallback((updates) => {
        if (updates.destination !== undefined) setDestination(updates.destination)
        if (updates.checkIn !== undefined) setCheckIn(updates.checkIn)
        if (updates.checkOut !== undefined) setCheckOut(updates.checkOut)
        if (updates.guests !== undefined) setGuests(updates.guests)
        if (updates.propertyType !== undefined) setPropertyType(updates.propertyType)
    }, [])

    const toggleAmenity = useCallback((amenity) => {
        setSelectedAmenities((prev) =>
        prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        )
    }, [])

    const resetFilters = useCallback(() => {
        setSortBy('recommended')
        setPriceRange([0, 1000])
        setSelectedAmenities([])
        setPropertyType('')
    }, [])

    return (
        <SearchContext.Provider
        value={{
            destination, checkIn, checkOut, guests, propertyType,
            sortBy, priceRange, selectedAmenities,
            setDestination, setCheckIn, setCheckOut, setGuests, setPropertyType,
            setSortBy, setPriceRange, toggleAmenity, updateSearch, resetFilters,
        }}
        >
        {children}
        </SearchContext.Provider>
    )
    }

    export function useSearch() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}
