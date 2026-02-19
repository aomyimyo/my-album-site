import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ALBUMS } from '../data/albums'
import './Home.css'

const container = {
  hidden: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Home() {
  return (
    <div className="home">
      <motion.header
        className="home-header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1>อัลบั้มรูปของเรา</h1>
        <p>เลือกอัลบั้มที่ต้องการดู</p>
      </motion.header>
      <motion.div
        className="album-grid"
        variants={container}
        initial="hidden"
        animate="animate"
      >
        {ALBUMS.map((album, i) => (
          <motion.div key={album.id} variants={card}>
            <Link to={`/album/${album.id}`} className="album-card">
              <div className="album-cover">
                <img src={album.coverImage} alt={album.title} />
                <span className="album-overlay" />
              </div>
              <h2>{album.title}</h2>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
