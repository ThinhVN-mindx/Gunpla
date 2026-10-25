/* ================================
   BẮT BUỘC ĐĂNG NHẬP
================================ */

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  alert("Vui lòng đăng nhập để xem sản phẩm");
  window.location.href = "./Login.html";
}

/* ================================
   "DATABASE" LOCAL + FAKE API
================================ */

const PRODUCTS_DB = [
  {
    id: 1,
    title: "RX-78-2 Gundam",
    grade: "MG",
    scale: "1/100",
    price: 890000,
    category: "Mobile Suit Gundam",
    description:
      "Cỗ máy đầu tiên của dòng Mobile Suit Gundam, khung trong chi tiết, kèm khiên và gươm beam.",
    image: "./img/images.jpg",
  },
  {
    id: 2,
    title: "Wing Gundam Zero EW",
    grade: "MG",
    scale: "1/100",
    price: 1250000,
    category: "Gundam Wing",
    description:
      "Đôi cánh lớn gập được, súng Twin Buster Rifle kèm hiệu ứng nhựa trong.",
    image: "./img/mo-hinh-gundam-mg-1-100-xxxg-00w0-wing-gundam-zero-ew-bandai-3.jpg",
  },
  {
    id: 3,
    title: "Barbatos Lupus Rex",
    grade: "HG",
    scale: "1/144",
    price: 420000,
    category: "Iron-Blooded Orphans",
    description:
      "Phiên bản dữ dằn từ Iron-Blooded Orphans, dễ lắp, mang theo chùy hạng nặng.",
    image: "./img/barbatos_lupus_rex.jpg",
  },
  {
    id: 4,
    title: "Unicorn Gundam",
    grade: "RG",
    scale: "1/144",
    price: 780000,
    category: "Gundam Unicorn",
    description: "Biến hình Unicorn / Destroy Mode, khung xương RG nhỏ gọn.",
    image: "./img/unicorn_gundam.jpg",
  },
  {
    id: 5,
    title: "Zaku II (Char Custom)",
    grade: "HG",
    scale: "1/144",
    price: 350000,
    category: "Zeon",
    description: "Chiến binh Zeon, nhẹ và dễ sơn tùy biến. Hợp cho người mới.",
    image: "./img/Zaku_II_(Char Custom).jpg",
  },
  {
    id: 6,
    title: "Strike Freedom Gundam",
    grade: "PG",
    scale: "1/60",
    price: 6900000,
    category: "Gundam SEED Destiny",
    description:
      "Cỡ Perfect Grade, đèn LED và cánh Dragoon. Dành cho người sưu tầm.",
    image: "./img/strike_freedom_gundam.jpg",
  },
];

function apiFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (url === "/products") {
          return resolve({ json: async () => PRODUCTS_DB });
        }
        const match = url.match(/^\/products\/(\d+)$/);
        if (match) {
          const id = Number(match[1]);
          const product = PRODUCTS_DB.find((p) => p.id === id);
          if (!product) return reject(new Error("Not found"));
          return resolve({ json: async () => product });
        }
        reject(new Error("Endpoint not found"));
      } catch (e) {
        reject(e);
      }
    }, 300);
  });
}

const formatPrice = (n) => n.toLocaleString("vi-VN") + "₫";
let ALL_PRODUCTS = [];

/* ================================
   LOAD DANH SÁCH SẢN PHẨM
================================ */

async function loadProducts() {
  const listDiv = document.getElementById("product-list");
  listDiv.innerHTML = "<p>Đang tải sản phẩm...</p>";

  // Từ khóa tìm kiếm (nếu có)
  const keyword = (localStorage.getItem("searchKeyword") || "").toLowerCase();

  try {
    const response = await apiFetch("/products");
    ALL_PRODUCTS = await response.json();

    let products = ALL_PRODUCTS;
    if (keyword) {
      products = ALL_PRODUCTS.filter((p) =>
        (p.title + " " + p.grade + " " + p.category + " " + p.description)
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (products.length === 0) {
      listDiv.innerHTML =
        "<p style='color:red'>Không tìm thấy sản phẩm phù hợp.</p>";
      return;
    }

    renderProductList(products);
  } catch (error) {
    console.error("Lỗi khi gọi API", error);
    listDiv.innerHTML =
      "<p style='color:red'>Không tải được danh sách sản phẩm.</p>";
  }

  localStorage.removeItem("searchKeyword");
}

/* ================================
   HIỂN THỊ DANH SÁCH SẢN PHẨM
================================ */

function renderProductList(products) {
  const listDiv = document.getElementById("product-list");
  listDiv.innerHTML = "";

  products.forEach((product) => {
    const { id, title, price, image, grade, scale } = product;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="book-info">
                <span class="tag">${grade} · ${scale}</span>
                <h3>${title}</h3>
                <p class="price"><strong>Giá:</strong> ${formatPrice(price)}</p>
                <button onclick="showProductDetail(${id})">
                    🔍 Xem chi tiết
                </button>
            </div>
        `;

    listDiv.appendChild(card);
  });
}

/* ================================
   CHI TIẾT SẢN PHẨM
================================ */

async function showProductDetail(id) {
  const detailDiv = document.getElementById("product-detail");
  detailDiv.innerHTML = "<p>Đang tải chi tiết sản phẩm...</p>";

  try {
    const response = await apiFetch(`/products/${id}`);
    const p = await response.json();

    detailDiv.innerHTML = `
            <div class="detail">
                <img src="${p.image}" alt="${p.title}">
                <div>
                    <h3>${p.title}</h3>
                    <p><strong>Tỷ lệ:</strong> ${p.grade} ${p.scale}</p>
                    <p><strong>Dòng:</strong> ${p.category}</p>
                    <p><strong>Giá:</strong> <span class="price">${formatPrice(p.price)}</span></p>
                    <p><strong>Mô tả:</strong> ${p.description}</p>
                    <button onclick="alert('Giá sản phẩm là ${formatPrice(p.price)}')">
                        💰 Lấy giá từ API
                    </button>
                </div>
            </div>
        `;

    detailDiv.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Lỗi khi xem chi tiết.", error);
    detailDiv.innerHTML =
      "<p style='color:red'>Không tải được chi tiết sản phẩm.</p>";
  }
}

/* ================================
   LỌC THEO HG / RG / MG / PG
================================ */

const filters = document.getElementById("filters");
if (filters) {
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.toggle("on", c === btn));
    const g = btn.dataset.g;
    renderProductList(
      g === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.grade === g),
    );
  });
}

/* ================================
   KHỞI CHẠY
================================ */

loadProducts();
