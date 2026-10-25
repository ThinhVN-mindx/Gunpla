const PRODUCTS_DB = [
  {
    id: 1,
    title: "RX-78-2 Gundam",
    grade: "MG",
    scale: "1/100",
    price: 890000,
    image: "./img/images.jpg",
    description:
      "Cỗ máy đầu tiên của dòng Mobile Suit Gundam, khung trong chi tiết, kèm khiên và gươm beam.",
  },
  {
    id: 2,
    title: "Wing Gundam Zero EW",
    grade: "MG",
    scale: "1/100",
    price: 1250000,
    image: "./img/mo-hinh-gundam-mg-1-100-xxxg-00w0-wing-gundam-zero-ew-bandai-3.jpg",
    description:
      "Đôi cánh lớn gập được, súng Twin Buster Rifle kèm hiệu ứng nhựa trong.",
  },
  {
    id: 3,
    title: "Barbatos Lupus Rex",
    grade: "HG",
    scale: "1/144",
    price: 420000,
    image: "./img/barbatos_lupus_rex.jpg",
    description:
      "Phiên bản dữ dằn từ Iron-Blooded Orphans, dễ lắp, mang theo chùy hạng nặng.",
  },
  {
    id: 4,
    title: "Unicorn Gundam",
    grade: "RG",
    scale: "1/144",
    price: 780000,
    image: "./img/unicorn_gundam.jpg",
    description: "Biến hình Unicorn / Destroy Mode, khung xương RG nhỏ gọn.",
  },
  {
    id: 5,
    title: "Zaku II (Char Custom)",
    grade: "HG",
    scale: "1/144",
    price: 350000,
    image: "./img/Zaku_II_(Char Custom).jpg",
    description: "Chiến binh Zeon, nhẹ và dễ sơn tùy biến. Hợp cho người mới.",
  },
  {
    id: 6,
    title: "Strike Freedom Gundam",
    grade: "PG",
    scale: "1/60",
    price: 6900000,
    image: "./img/strike_freedom_gundam.jpg",
    description:
      "Cỡ Perfect Grade, đèn LED và cánh Dragoon. Dành cho người sưu tầm.",
  },
];

function apiFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/products") {
        return resolve({ json: async () => PRODUCTS_DB });
      }
      const match = url.match(/^\/products\/(\d+)$/);
      if (match) {
        const product = PRODUCTS_DB.find((p) => p.id === Number(match[1]));
        if (!product) return reject(new Error("Not found"));
        return resolve({ json: async () => product });
      }
      reject(new Error("Endpoint not found"));
    }, 300);
  });
}
