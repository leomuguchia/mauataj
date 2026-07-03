import { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCard'
import BulkToggle from './BulkToggle'
import styles from './Catalogue.module.css'

const CAT_LABELS = {
  all: 'All',
  meat: 'Meat & Fish',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
}

const RETAIL_STEP = 1
const BULK_STEP = 10

export default function Catalogue({ products, cart, onAdd, onIncrease, onDecrease }) {
  const [activeCat, setActiveCat] = useState('all')
  const [isBulk, setIsBulk] = useState(false)
  const gridRef = useRef(null)

  const step = isBulk ? BULK_STEP : RETAIL_STEP
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = activeCat === 'all' ? products : products.filter(p => p.category === activeCat)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(`.${styles.cardReveal}`)
    if (!cards) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target
            setTimeout(() => el.classList.add(styles.visible), Number(el.dataset.delay))
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [filtered, isBulk])

  return (
    <section className={styles.section} id="products">
      <div className={styles.blobTr} />
      <div className={styles.blobBl} />
      <div className={styles.blobMid} />

      <div className={styles.header}>
        <div className={styles.eyebrow}>Our products</div>
        <h2 className={styles.title}>What we supply</h2>
        <p className={styles.sub}>
          Pick what you need and tap the WhatsApp button to send your order.
          Prices are per unit, adjust quantities below.
        </p>
      </div>

      <BulkToggle isBulk={isBulk} onChange={setIsBulk} />

      {isBulk && (
        <div className={styles.bulkNotice}>
          🏨 <strong>Bulk mode on</strong> — quantities increase in 10 kg steps. For hotels, restaurants and catering businesses.
        </div>
      )}

      <div className={styles.tabs}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.tab} ${activeCat === cat ? styles.activeTab : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {CAT_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      <div className={styles.grid} ref={gridRef}>
        {filtered.map((p, i) => (
          <div key={p.id} className={styles.cardReveal} data-delay={i * 30}>
            <ProductCard
              product={p}
              qty={cart[p.id] || 0}
              step={step}
              isBulkMode={isBulk}
              onAdd={onAdd}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>
        ))}
      </div>
    </section>
  )
}