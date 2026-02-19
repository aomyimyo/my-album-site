// เซิร์ฟเวอร์ API สำหรับรัน local — ตรวจรหัสดาวน์โหลด (อ่านจาก .env)
// รันพร้อมกับ Vite ผ่าน npm run dev

import 'dotenv/config'
import http from 'node:http'

const PORT = 3001

function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200).end()
    return
  }

  if (req.url !== '/api/verify-download' || req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
    return
  }

  let codes = {}
  let urls = {}
  try {
    if (process.env.ALBUM_CODES) codes = JSON.parse(process.env.ALBUM_CODES)
    if (process.env.ALBUM_DOWNLOAD_URLS) urls = JSON.parse(process.env.ALBUM_DOWNLOAD_URLS)
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: 'Server config error' }))
    return
  }

  const body = await parseBody(req)
  const { albumId, code } = body
  const expected = codes[albumId]
  if (!albumId || !code || !expected) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false }))
    return
  }

  const normalized = String(code).trim().toUpperCase()
  const match = String(expected).trim().toUpperCase()
  if (normalized !== match) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false }))
    return
  }

  const downloadUrl = urls[albumId] || ''
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ ok: true, downloadUrl }))
})

server.listen(PORT, () => {
  console.log(`[local API] http://localhost:${PORT}/api/verify-download`)
})
