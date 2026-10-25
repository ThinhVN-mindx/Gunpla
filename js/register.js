(() => {
  const form = document.getElementById("signupForm");
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
    const confirmPassword = document.getElementById("confirmPassword").value;
    const birthday = document.getElementById("birthday").value;

    if (!email || !password || !confirmPassword || !birthday) return showMessage("Vui lòng điền đầy đủ thông tin.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage("Email chưa đúng định dạng.");
    if (password.length < 8) return showMessage("Mật khẩu cần có ít nhất 8 ký tự.");
    if (password !== confirmPassword) return showMessage("Mật khẩu xác nhận chưa khớp.");
    if (new Date(birthday) > new Date()) return showMessage("Ngày sinh không thể ở tương lai.");

    let users;
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }

    if (users.some((user) => user.email?.toLowerCase() === email)) return showMessage("Email này đã được đăng ký.");

    users.push({ email, password, birthday });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Tạo tài khoản thành công. Đang chuyển đến đăng nhập…", true);
    form.reset();
    window.setTimeout(() => { window.location.href = "./Login.html"; }, 700);
  });
})();
