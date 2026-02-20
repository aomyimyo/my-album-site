export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid body" });
    }
  }

  const { albumId, code } = body || {};

  let codes = {};
  let urls = {};
  try {
    if (process.env.ALBUM_CODES) {
      codes = JSON.parse(process.env.ALBUM_CODES);
    }
    if (process.env.ALBUM_DOWNLOAD_URLS) {
      urls = JSON.parse(process.env.ALBUM_DOWNLOAD_URLS);
    }
  } catch {
    return res.status(500).json({
      ok: false,
      error: "Invalid JSON in Environment Variables",
    });
  }

  const expected = codes[albumId];

  if (!albumId || !code || expected === undefined) {
    return res.status(200).json({ ok: false });
  }

  const normalized = String(code).trim().toUpperCase();
  const match = String(expected).trim().toUpperCase();

  if (normalized !== match) {
    return res.status(200).json({ ok: false });
  }

  return res.status(200).json({
    ok: true,
    downloadUrl: urls[albumId] || "",
  });
}
