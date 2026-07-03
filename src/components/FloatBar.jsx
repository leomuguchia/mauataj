import styles from './FloatBar.module.css'

export default function FloatBar({ itemCount, onOpen }) {
  if (itemCount === 0) return null
  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <strong>{itemCount} item{itemCount !== 1 ? 's' : ''}</strong> selected
      </div>
      <button className={styles.btn} onClick={onOpen}>
        Review &amp; send order →
      </button>
    </div>
  )
}
