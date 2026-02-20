import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ALBUMS } from '../data/albums'
import './Album.css'

const galleryContainer = {
  hidden: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
}

const galleryItem = {
  hidden: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Album() {
  const { albumId } = useParams()
  const album = ALBUMS.find((a) => a.id === albumId)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  useEffect(() => {
    if (lightboxIndex !== null) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [lightboxIndex])
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadPassword, setDownloadPassword] = useState('')
  const [downloadError, setDownloadError] = useState('')
  const [downloadLoading, setDownloadLoading] = useState(false)

  if (!album) {
    return (
      <div className="album-page">
        <p>ไม่พบอัลบั้มนี้</p>
        <Link to="/">กลับหน้าหลัก</Link>
      </div>
    )
  }

  const handleDownloadClick = (e) => {
    e.preventDefault()
    setShowDownloadModal(true)
    setDownloadPassword('')
    setDownloadError('')
  }

  const handleDownloadSubmit = async (e) => {
    e.preventDefault()
    setDownloadError('')
    setDownloadLoading(true)
    try {
      const res = await fetch('/api/verify-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumId: album.id, code: downloadPassword }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.ok && data.downloadUrl) {
        window.open(data.downloadUrl, '_blank', 'noopener,noreferrer')
        setShowDownloadModal(false)
        setDownloadPassword('')
      } else {
        setDownloadError('รหัสไม่ถูกต้อง กรุณาลองใหม่')
      }
    } catch {
      setDownloadError('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setDownloadLoading(false)
    }
  }

  const goPrev = (e) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i <= 0 ? album.images.length - 1 : i - 1))
  }
  const goNext = (e) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i >= album.images.length - 1 ? 0 : i + 1))
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const len = album.images.length
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i <= 0 ? len - 1 : i - 1))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i >= len - 1 ? 0 : i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, album.images.length])

  return (
    <div className="album-page">
      <motion.header
        className="album-header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link to="/" className="back-link">← กลับหน้าหลัก</Link>
        <h1>{album.title}</h1>
        <button type="button" className="download-btn" onClick={handleDownloadClick}>
          ดาวน์โหลดรูปทั้งหมด
        </button>
      </motion.header>
      <motion.div
        className="gallery gallery--pinterest"
        variants={galleryContainer}
        initial="hidden"
        animate="animate"
      >
        {album.images.map((src, i) => (
          <motion.button
            key={i}
            type="button"
            className="gallery-item"
            variants={galleryItem}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={src} alt={`รูปที่ ${i + 1}`} loading="lazy" />
          </motion.button>
        ))}
      </motion.div>
      {showDownloadModal && (
        <div
          className="download-modal-overlay"
          onClick={() => setShowDownloadModal(false)}
          role="dialog"
          aria-label="ใส่รหัสเพื่อดาวน์โหลด"
        >
          <div className="download-modal" onClick={(e) => e.stopPropagation()}>
            <h2>ดาวน์โหลดรูปทั้งหมด</h2>
            <p>กรุณาใส่รหัสเพื่อเปิดลิงก์ดาวน์โหลด</p>
            <form onSubmit={handleDownloadSubmit}>
              <input
                type="text"
                value={downloadPassword}
                onChange={(e) => setDownloadPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                autoFocus
                autoComplete="off"
                className={downloadError ? 'input-error' : ''}
              />
              {downloadError && <p className="error-msg">{downloadError}</p>}
              <div className="download-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowDownloadModal(false)}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn-confirm" disabled={downloadLoading}>
                  {downloadLoading ? 'กำลังตรวจสอบ...' : 'เปิดลิงก์ดาวน์โหลด'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="lightbox"
              onClick={() => setLightboxIndex(null)}
              role="dialog"
              aria-label="ดูรูปเต็ม"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="lightbox-content"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setLightboxIndex(null)
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="ปิด"
                >
                  ×
                </button>
                <button
                  type="button"
                  className="lightbox-arrow lightbox-prev"
                  onClick={goPrev}
                  aria-label="รูปก่อนหน้า"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  type="button"
                  className="lightbox-arrow lightbox-next"
                  onClick={goNext}
                  aria-label="รูปถัดไป"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={lightboxIndex}
                    src={album.images[lightboxIndex]}
                    alt={`รูปที่ ${lightboxIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                <span className="lightbox-counter">
                  {lightboxIndex + 1} / {album.images.length}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
