# เว็บอัลบั้มรูป

เว็บเก็บอัลบั้มรูป มีแกลเลอรีและปุ่มดาวน์โหลดไปยัง Google Drive (ใส่รหัสก่อนเปิดลิงก์)

## การรันโปรเจกต์

```bash
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

**รัน local ให้ปุ่มดาวน์โหลดทำงาน:**  
คัดลอก `.env.example` เป็น `.env` แล้วใส่รหัสและลิงก์ (รูปแบบเดียวกับ Vercel env) จากนั้นรัน `npm run dev` — จะรันทั้ง Vite และ API local พร้อมกัน

## Deploy บน Vercel (รหัสไม่โผล่ในโค้ด)

รหัสและลิงก์ดาวน์โหลด **ไม่เก็บในไฟล์ที่ส่งให้เบราว์เซอร์** เก็บเฉพาะใน Vercel (Environment Variables)

### 1. ตั้งค่า Environment Variables ใน Vercel

ไปที่ **Project → Settings → Environment Variables** แล้วเพิ่ม 2 ตัว:

**ALBUM_CODES** (รหัสแต่ละอัลบั้ม)

```json
{"album-1":"A1234","album-2":"B1234","album-3":"C1234","album-4":"D1234","album-5":"E1234"}
```

**ALBUM_DOWNLOAD_URLS** (ลิงก์ดาวน์โหลดแต่ละอัลบั้ม)

```json
{"album-1":"https://drive.google.com/file/d/xxxx/view?usp=drive_link","album-2":"https://...","album-3":"https://...","album-4":"https://...","album-5":"https://..."}
```

แก้ `album-1`, `album-2`, … ให้ตรงกับ `id` ใน `src/data/albums.js` และใส่ลิงก์ Google Drive จริงของแต่ละอัลบั้ม

### 2. Deploy

Push โปรเจกต์ขึ้น Git แล้วเชื่อมกับ Vercel — โฟลเดอร์ `api/` จะถูก deploy เป็น Serverless Function อัตโนมัติ

## แก้ไขข้อมูลอัลบั้ม (ในโค้ด)

แก้ไฟล์ **`src/data/albums.js`** เพื่อเปลี่ยน:

- **id** – ใช้เป็น key ตรงกับ ALBUM_CODES / ALBUM_DOWNLOAD_URLS ใน Vercel
- **title** – ชื่ออัลบั้ม
- **coverImage** – URL รูปปก
- **images** – รายการ URL รูปในแกลเลอรี

รหัสและลิงก์ดาวน์โหลดแก้เฉพาะใน Vercel Environment Variables (ไม่ใส่ใน albums.js)

## Build

```bash
npm run build
```

ไฟล์จะอยู่ที่โฟลเดอร์ `dist/` สำหรับ deploy แบบ static (ถ้าไม่ใช้ Vercel API รหัสจะไม่ทำงาน ต้องใช้ Vercel + env vars ตามด้านบน)
