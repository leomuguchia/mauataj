import styles from './Nav.module.css'

export default function Nav({ cartCount, onCartClick }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.main}>Mauataj</span>
        <span className={styles.foods}>foods</span>
      </div>
      <button className={styles.cartBtn} onClick={onCartClick}>
        🛒 Order
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </button>
    </nav>
  )
}