import { useState, useRef, useEffect } from 'react'
import styles from './ProductImage.module.css'

export default function ProductImage({ src, alt, emoji }) {
  const [status, setStatus] = useState('loading') // loading | loaded | error
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || inView) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' } // start fetching just before it scrolls into view
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [inView])

  // No src at all -> just show emoji straight away, no point pretending to load
  const noSrc = !src
  const showSkeleton = !noSrc && status === 'loading'
  const showImg = !noSrc && status !== 'error'
  const showEmoji = noSrc || status === 'error'

  return (
    <div ref={ref} className={styles.wrap}>
      {showSkeleton && <div className={styles.skeleton} />}

      {showEmoji && <span className={styles.emoji}>{emoji}</span>}

      {showImg && inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className={styles.img}
          style={{ opacity: status === 'loaded' ? 1 : 0 }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  )
}