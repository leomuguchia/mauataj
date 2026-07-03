import { useState } from 'react'

const WA_NUMBER = '254700346660'
const EMAIL = 'mauatajfoods@gmail.com'

export function useCart() {
  const [cart, setCart] = useState({}) 

  function add(id, step = 1) {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + step }))
  }

  function remove(id, step = 1) {
    setCart(c => {
      const next = { ...c }
      const newQty = (next[id] || 0) - step
      if (newQty <= 0) delete next[id]
      else next[id] = newQty
      return next
    })
  }

  function clear() { setCart({}) }

  function totalItems() {
    return Object.values(cart).reduce((a, b) => a + b, 0)
  }

  function buildOrder(products) {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = products.find(x => x.id === id)
        return p ? { product: p, qty } : null
      })
      .filter(Boolean)
  }

  function orderTotal(products) {
    return buildOrder(products).reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  }

  function buildWAMessage(products) {
    const items = buildOrder(products)
    if (!items.length) return ''
    const lines = ["Hi, I'd like to place an order:\n"]
    items.forEach(({ product, qty }) => {
      lines.push(`• ${product.name} — ${qty} ${product.unit} @ KES ${product.price.toLocaleString()}/${product.unit} = KES ${(product.price * qty).toLocaleString()}`)
    })
    lines.push(`\nDelivery: KES 150`)
    lines.push(`Total: KES ${(orderTotal(products) + 150).toLocaleString()}`)
    lines.push('\nPlease confirm my order and delivery details. Thank you!')
    return lines.join('\n')
  }

  function sendWhatsApp(products) {
    const msg = encodeURIComponent(buildWAMessage(products))
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  return { cart, add, remove, clear, totalItems, buildOrder, orderTotal, sendWhatsApp }
}