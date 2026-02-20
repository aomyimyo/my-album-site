function sendJson(res, status, data) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).end(JSON.stringify(data));
}

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  // parse body
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      sendJson(res, 400, { ok: false, error: "Invalid body" });
      return;
    }
  }

  const { albumId, code } = body;

  // parse env JSON
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
    sendJson(res, 500, {
      ok: false,
      error: "Server config error: Invalid JSON in Environment Variables",
    });
    return;
  }

  const expected = codes[albumId];

  if (!albumId || !code || expected === undefined) {
    sendJson(res, 200, { ok: false });
    return;
  }

  const normalized = String(code).trim().toUpperCase();
  const match = String(expected).trim().toUpperCase();

  if (normalized !== match) {
    sendJson(res, 200, { ok: false });
    return;
  }

  // found matching code → send download URL
  const downloadUrl = urls[albumId] || "";
  sendJson(res, 200, { ok: true, downloadUrl });
};
