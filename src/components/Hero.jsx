import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export default function Hero({ onBrowseClick, onWhatsAppClick }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.hero}>
      <div className={styles.bgImage} />
      <div className={styles.bgScrim} />

      <div
        className={styles.inner}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div className={styles.foodStrip}>🥩 🥬 🍅 🐔 🥑</div>

        <div className={styles.eyebrow}>📍 Nairobi & surroundings</div>

        <h1 className={styles.h1}>
          Fresh meat, fruits &amp; vegetables<br />
          <em>delivered to your door</em>
        </h1>

        <p className={styles.sub}>
          Quality produce for homes, hotels, restaurants and catering businesses.
          Pick what you need, send your order on WhatsApp.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={onBrowseClick}>
            Browse products ↓
          </button>
          <button className={styles.btnWa} onClick={onWhatsAppClick}>
            💬 WhatsApp order
          </button>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <div className={styles.trustNum}>Same day</div>
            <div className={styles.trustLabel}>Delivery in Nairobi</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNum}>Fresh daily</div>
            <div className={styles.trustLabel}>Sourced every morning</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNum}>WhatsApp</div>
            <div className={styles.trustLabel}>Simple ordering</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNum}>Bulk welcome</div>
            <div className={styles.trustLabel}>Hotels & restaurants</div>
          </div>
        </div>
      </div>
    </div>
  )
}