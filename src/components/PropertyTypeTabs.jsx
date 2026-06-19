import { useState } from 'react'
import { Link } from 'react-router-dom'
import properties from '../data/properties.json'
import PropertyCard from './PropertyCard'

const tabs = [
  {
    type: '',
    label: 'All stays',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  },
  {
    type: 'hotel',
    label: 'Hotels',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  },
  {
    type: 'apartment',
    label: 'Apartments',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>,
  },
  {
    type: 'resort',
    label: 'Resorts',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  },
  {
    type: 'villa',
    label: 'Villas',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" /></svg>,
  },
]

export default function PropertyTypeTabs() {
  const [activeType, setActiveType] = useState('')

  const filtered = activeType
    ? properties.filter((p) => p.type === activeType).slice(0, 4)
    : properties.slice(0, 4)

  return (
    <section className="container-main py-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Homes guests love</h2>
        <Link to="/search" className="text-sm text-[#0071c2] hover:underline font-medium whitespace-nowrap">
          See all
        </Link>
      </div>

      {/* Tabs — scrollable on mobile/tablet, static wrap on lg+ */}
      <div className="flex items-center gap-2 overflow-x-auto lg:overflow-x-visible lg:flex-wrap pb-4" style={{ scrollbarWidth: 'none' }}>
        {tabs.map(({ type, label, icon }) => {
          const active = activeType === type
          return (
            <button
              key={type || 'all'}
              onClick={() => setActiveType(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors duration-150 shrink-0 ${
                active
                  ? 'bg-[#003580] text-white border-[#003580]'
                  : 'bg-white text-gray-700 border-border hover:border-[#003580] hover:text-[#003580]'
              }`}
            >
              <span className={active ? 'text-white' : 'text-gray-500'}>{icon}</span>
              {label}
            </button>
          )
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} layout="vertical" />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-4 text-center py-14 bg-white rounded-xl border border-border">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <p className="font-semibold text-gray-900">No properties found</p>
            <p className="text-sm text-muted mt-1">Try a different category</p>
          </div>
        )}
      </div>
    </section>
  )
}
