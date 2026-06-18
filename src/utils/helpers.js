export function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1
  return Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
}
