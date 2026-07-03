import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/products.json')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [])

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  function byCategory(cat) {
    if (cat === 'all') return products
    return products.filter(p => p.category === cat)
  }

  return { products, loading, error, categories, byCategory }
}
