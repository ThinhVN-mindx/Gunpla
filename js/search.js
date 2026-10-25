function search() {
  const keyword = document.getElementById("searchInput").value.trim();

  if (keyword === "") {
    alert("Vui lòng nhập từ khóa!");
    return;
  }

  // Lưu từ khóa để Products dùng
  localStorage.setItem("searchKeyword", keyword);

  // Chuyển sang trang sản phẩm
  window.location.href = "Products.html";
}

document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") search();
});
