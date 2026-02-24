export const formatINR = (value) => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0)
  } catch {
    return `₹${(value || 0).toLocaleString('en-IN')}`
  }
}

export const formatINRWithSign = (value) => {
  const v = Number(value || 0)
  const prefix = v >= 0 ? '+ ' : '- '
  return prefix + formatINR(Math.abs(v))
}
