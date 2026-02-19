// อัลบั้มทั้ง 5 (แก้ชื่อ รูป ได้ที่นี่)
// รหัสและลิงก์ดาวน์โหลดตั้งใน Vercel Environment Variables เท่านั้น → ดู README
//
// รูปจาก Google Drive: ใช้รูปแบบ thumbnail ตามด้านล่าง (sz = w400, w800, w1920 ฯลฯ)
const driveImg = (id, size = "w1920") =>
  `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;

export const ALBUMS = [
  {
    id: "album-1",
    title: "อัลบั้มที่ 1",
    coverImage: driveImg("1yoq_QNtrYEPISnI3Rorl4E1wqoSfVP0i", "w800"),
    images: [
      driveImg("1yoq_QNtrYEPISnI3Rorl4E1wqoSfVP0i"),
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&fit=crop",
    ],
  },
  {
    id: "album-2",
    title: "อัลบั้มที่ 2",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&fit=crop",
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
      "https://images.unsplash.com/photo-1501854140801-50d01698999b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698999b?w=800&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&fit=crop",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&fit=crop",
    ],
  },
  {
    id: "album-5",
    title: "อัลบั้มที่ 5",
    coverImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&fit=crop",
    ],
  },
];
