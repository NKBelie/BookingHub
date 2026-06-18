function getRatingLabel(score) {
  if (score >= 9) return 'Exceptional'
  if (score >= 8) return 'Excellent'
  if (score >= 7) return 'Very Good'
  if (score >= 6) return 'Good'
  return 'Okay'
}

export default function RatingBadge({ rating }) {
  if (!rating) return null
  const score = Math.round(rating * 10) / 10
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="text-xs text-gray-600">{getRatingLabel(score)}</span>
      <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg">
        {score.toFixed(1)}
      </span>
    </div>
  )
}
