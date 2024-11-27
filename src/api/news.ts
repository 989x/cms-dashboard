export interface NewsItem {
  id: number;
  title: string;
  date: string;
  tags: string[];
  description: string;
  image: string;
  link: string;
}

export const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "CMS Dashboard ขยายบริการ Cloud Services ในปี 2024",
    date: "27 พ.ย.",
    tags: ["Cloud", "Services", "Technology"],
    description:
      "CMS Dashboard เปิดตัวบริการ Cloud ใหม่ที่มาพร้อมเทคโนโลยีล้ำสมัย เพื่อช่วยองค์กรยุคดิจิทัลในการจัดเก็บและจัดการข้อมูลอย่างปลอดภัยและรวดเร็ว รองรับการขยายตัวของธุรกิจในอนาคต",
    image: "https://img.pptvhd36.com/thumbor/2024/05/30/news-ad1fe79.webp",
    link: "#",
  },
  {
    id: 2,
    title: "อัปเดตใหม่: เพิ่มความปลอดภัยในระบบข้อมูลของ CMS Dashboard",
    date: "20 พ.ย.",
    tags: ["Security", "Update"],
    description:
      "CMS Dashboard เพิ่มฟีเจอร์ความปลอดภัยใหม่ อาทิ การยืนยันตัวตนแบบหลายขั้นตอนและการเข้ารหัสข้อมูลระดับสูง เพื่อป้องกันข้อมูลสำคัญขององค์กร",
    image: "https://img.pptvhd36.com/thumbor/2024/05/30/news-ad1fe79.webp",
    link: "#",
  },
  {
    id: 3,
    title: "CMS Dashboard รองรับการวิเคราะห์ข้อมูลด้วย AI อัจฉริยะ",
    date: "15 พ.ย.",
    tags: ["AI", "Data Analytics"],
    description:
      "เพิ่มศักยภาพการวิเคราะห์ข้อมูลด้วย AI อัจฉริยะที่ช่วยให้ผู้ใช้สามารถวิเคราะห์ข้อมูลเชิงลึกได้อย่างรวดเร็ว รองรับการตัดสินใจทางธุรกิจที่แม่นยำยิ่งขึ้น",
    image: "https://img.pptvhd36.com/thumbor/2024/05/30/news-ad1fe79.webp",
    link: "#",
  },
  {
    id: 4,
    title: "เปิดตัว CMS Dashboard เวอร์ชันใหม่ รองรับการใช้งานในทุกแพลตฟอร์ม",
    date: "10 พ.ย.",
    tags: ["Platform", "Update"],
    description:
      "CMS Dashboard อัปเดตใหม่ รองรับการใช้งานข้ามแพลตฟอร์มทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์ พร้อมปรับปรุง UI/UX ให้ใช้งานง่ายและทันสมัย",
    image: "https://img.pptvhd36.com/thumbor/2024/05/30/news-ad1fe79.webp",
    link: "#",
  },
];
