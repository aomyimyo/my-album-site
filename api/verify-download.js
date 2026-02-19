// Vercel Serverless Function: ตรวจรหัสดาวน์โหลดฝั่งเซิร์ฟเวอร์
// รหัสและลิงก์ไม่ไปอยู่ในไฟล์ที่ส่งให้เบราว์เซอร์
// ตั้งค่าใน Vercel: Project → Settings → Environment Variables

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let codes = {}
  let urls = {}
  try {
    if (process.env.ALBUM_CODES) codes = JSON.parse(process.env.ALBUM_CODES)
    if (process.env.ALBUM_DOWNLOAD_URLS) urls = JSON.parse(process.env.ALBUM_DOWNLOAD_URLS)
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Server config error' })
  }

  const { albumId, code } = req.body || {}
  const expected = codes[albumId]
  if (!albumId || !code || !expected) {
    return res.status(200).json({ ok: false })
  }

  const normalized = String(code).trim().toUpperCase()
  const match = String(expected).trim().toUpperCase()
  if (normalized !== match) {
    return res.status(200).json({ ok: false })
  }

  const downloadUrl = urls[albumId] || ''
  return res.status(200).json({ ok: true, downloadUrl })
}
