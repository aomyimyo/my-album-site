// อัลบั้มทั้ง 5 (แก้ชื่อ รูป ได้ที่นี่)
// รหัสและลิงก์ดาวน์โหลดตั้งใน Vercel Environment Variables เท่านั้น → ดู README
//
// รูปจากโฟลเดอร์ public/img/ ใช้ path /img/ชื่อไฟล์ (ไม่ต้อง import)
// พอขึ้น production อยากใช้ Google Drive แทน เปลี่ยนเป็น driveImg(id, size) ตามด้านล่าง
const driveImg = (id, size = "w1920") =>
  `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;

export const ALBUMS = [
  {
    id: "album-1",
    title: "ตูตูดอกทานตะวัน",
    coverImage: "/img/IMG_1537.jpg",
    images: [
      "/img/IMG_1390.jpg",
      "/img/IMG_1370.jpg",
      "/img/IMG_1377.jpg",
      "/img/IMG_1381.jpg",
      "/img/IMG_1402.jpg",
      "/img/IMG_1416.jpg",
      "/img/IMG_1433.jpg",
      "/img/IMG_1479.jpg",
      "/img/IMG_1544.jpg",
      "/img/IMG_1560.jpg",
      "/img/IMG_1414.jpg",
      "/img/IMG_1565.jpg",
      "/img/IMG_1537.jpg",
      "/img/IMG_1556.jpg",
      "/img/IMG_1570.jpg",
    ],
  },
  {
    id: "album-2",
    title: "แป้งรถไฟ",
    coverImage: "/img/IMG_4314.jpg",
    images: [
      "/img/IMG_4314.jpg",
      "/img/IMG_4353.jpg",
      "/img/IMG_4365.jpg",
      "/img/IMG_4375.jpg",
      "/img/IMG_4691.jpg",
      "/img/IMG_4582.jpg",
      "/img/IMG_4600.jpg",
      "/img/IMG_4674.jpg",
      "/img/IMG_4683.jpg",

      "/img/IMG_4726.jpg",
      "/img/IMG_4762.jpg",
      "/img/IMG_4814.jpg",
      "/img/IMG_4869.jpg",
      "/img/IMG_4874.jpg",
      "/img/IMG_4848.jpg",
    ],
  },
  {
    id: "album-3",
    title: "อัลบั้มที่ 3",
    coverImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&fit=crop",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&fit=crop",
    ],
  },

  {
    id: "album-4",
    title: "อัลบั้มที่ 4",
    coverImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&fit=crop",
    ],
  },
];
