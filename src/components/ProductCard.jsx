import styles from './ProductCard.module.css'
import ProductImage from './ProductImage'

const CAT_BG = {
  meat: '#fceaea',
  vegetables: '#edf5e8',
  fruits: '#fdf3e3',
}

export default function ProductCard({ product, qty, step = 1, isBulkMode, onAdd, onIncrease, onDecrease }) {
  const bg = CAT_BG[product.category] || '#f0ede8'

  return (
    <div className={`${styles.card} ${isBulkMode ? styles.bulkCard : ''}`}>
      <div className={styles.imgArea} style={{ background: bg }}>
        <ProductImage src={product.image} alt={product.name} emoji={product.emoji} />
        {isBulkMode && <span className={styles.bulkPill}>BULK</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.desc}>{product.description}</div>
        <div className={styles.footer}>
          <div>
            <div className={styles.price}>KES {product.price.toLocaleString()}</div>
            <div className={styles.unit}>per {product.unit}</div>
          </div>
          {qty === 0 ? (
            <button className={styles.addBtn} onClick={() => onAdd(product.id, step)}>+</button>
          ) : (
            <div className={styles.qtyCtrl}>
              <button className={styles.qtyBtn} onClick={() => onDecrease(product.id, step)}>−</button>
              <span className={styles.qtyNum}>{qty}<span className={styles.qtyUnit}>kg</span></span>
              <button className={styles.qtyBtn} onClick={() => onIncrease(product.id, step)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}