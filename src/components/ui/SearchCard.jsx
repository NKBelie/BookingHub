import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'
export default function SearchCard({ compact = false, className = '' }) {
    const navigate = useNavigate()
    // const { destination, checkIn, checkOut, guests, updateSearch } = useSearch()
    const [showGuests, setShowGuests] = useState(false)
    // const [localDest, setLocalDest] = useState(destination)
    // const [localCheckIn, setLocalCheckIn] = useState(checkIn)
    // const [localCheckOut, setLocalCheckOut] = useState(checkOut)
    // const [localGuests, setLocalGuests] = useState(guests)

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

    // const guestLabel = `${localGuests.adults} adult${localGuests.adults !== 1 ? 's' : ''}${
    //     localGuests.children > 0
    //     ? ` · ${localGuests.children} child${localGuests.children !== 1 ? 'ren' : ''}`
    //     : ''
    // } · ${localGuests.rooms} room${localGuests.rooms !== 1 ? 's' : ''}`

    return (
        <form onSubmit={handleSearch}className={`bg-accent rounded-lg p-1 shadow-lg ${compact ? '' : 'w-full'} ${className}`}>
        <div className={`flex flex-col gap-1 ${compact ? 'md:flex-row md:items-stretch' : 'lg:flex-row lg:items-stretch'}`}>
            <div className={`flex-1/2 bg-white rounded-md ${compact ? 'p-3' : 'p-4'} relative`}>
            <input id="destination" type="text" placeholder="Where are you going?"/*value={localDest}*/ onChange={(e) => setLocalDest(e.target.value)}
                className="w-20px text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
            </div>
            <div className={`flex flex-col sm:flex-row gap-1 ${compact ? 'md:flex-row' : 'lg:flex-row'}`}>
            <div className={`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} sm:flex-1`}>
            <input  id="checkin"  type="date"  
            // value={localCheckIn} 
            in={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLocalCheckIn(e.target.value)}
                className="w-full text-sm text-gray-900 focus:outline-none bg-transparent"
            />
            </div>
            <div className={`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} sm:flex-1`}>
            <input  id="checkout"  type="date" 
            // value={localCheckOut}  
            // in={localCheckIn}  onChange={(e) => setLocalCheckOut(e.target.value)}
                className="w-full text-sm text-gray-900 focus:outline-none bg-transparent"
            />
            </div>
            <div className= {`bg-white rounded-md ${compact ? 'p-3' : 'p-4'} sm:flex-1`}>
            <input type='number' placeholder='Guests'/>
            </div>

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
