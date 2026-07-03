import styles from './BulkToggle.module.css'

export default function BulkToggle({ isBulk, onChange }) {
  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.option} ${!isBulk ? styles.active : ''}`}
        onClick={() => onChange(false)}
      >
        🧑 Retail
        <span className={styles.hint}>1 kg steps</span>
      </button>
      <button
        className={`${styles.option} ${isBulk ? styles.activeBulk : ''}`}
        onClick={() => onChange(true)}
      >
        🏨 Bulk
        <span className={styles.hint}>10 kg steps</span>
      </button>
    </div>
  )
}