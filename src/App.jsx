import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Album from './pages/Album'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ minHeight: '100vh' }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/album/:albumId"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ minHeight: '100vh' }}
            >
              <Album />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
