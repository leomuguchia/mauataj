import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import { useCart } from './hooks/useCart'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Catalogue from './components/Catalogue'
import OrderDrawer from './components/OrderDrawer'
import FloatBar from './components/FloatBar'
import Contact from './components/Contact'

export default function App() {
  const { products, loading } = useProducts()
  const { cart, add, remove, totalItems, buildOrder, orderTotal, sendWhatsApp } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const orderItems = buildOrder(products)
  const total = orderTotal(products)

  function handleBrowse() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleBulk() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSendWA() {
    sendWhatsApp(products)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--ink-3)', fontSize: 14 }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Nav cartCount={totalItems()} onCartClick={() => setDrawerOpen(true)} />
      <Hero onBrowseClick={handleBrowse} onWhatsAppClick={handleSendWA} />
      <Catalogue
        products={products}
        cart={cart}
        onAdd={add}
        onIncrease={add}
        onDecrease={remove}
      />
      <Contact />
      <FloatBar itemCount={totalItems()} onOpen={() => setDrawerOpen(true)} />
      <OrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        orderItems={orderItems}
        orderTotal={total}
        onIncrease={add}
        onDecrease={remove}
        onSendWA={handleSendWA}
      />
    </>
  )
}
