(() => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const message = document.getElementById("msg");
  const showMessage = (text, success = false) => {
    message.textContent = text;
    message.classList.toggle("ok", success);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) return showMessage("Vui lòng nhập email và mật khẩu.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage("Email chưa đúng định dạng.");

    let users;
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }

    const user = users.find((item) => item.email?.toLowerCase() === email && item.password === password);
    if (!user) return showMessage("Email hoặc mật khẩu chưa chính xác.");

    const { password: ignored, ...safeUser } = user;
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
    showMessage("Đăng nhập thành công. Đang chuyển trang…", true);
    window.setTimeout(() => { window.location.href = "./index.html"; }, 500);
  });
})();
