/* ================= AUTH CHECK ================= */
// ❗ Page load hote hi check hoga, bar-bar redirect nahi karega
(function checkAuth() {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.replace("admin-login.html");
  }
})();

/* ================= SIDEBAR TOGGLE ================= */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("show");
}

/* ================= LOAD ADMIN PROFILE ================= */
function loadAdminProfile() {
  // 🔹 Demo data (backend aane par API se replace hoga)
  const admin = {
    name: "Abhishek Kumar",
    email: "abhishek.kumar@gmail.com",
    username: "admin",
    phone: "+91 9876543210",
    role: "Administrator"
  };

  const setVal = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  };

  setVal("adminName", admin.name);
  setVal("adminEmail", admin.email);
  setVal("adminUsername", admin.username);
  setVal("adminPhone", admin.phone);
  setVal("adminRole", admin.role);
}

/* ================= CHANGE PASSWORD ================= */
function changePassword() {
  const newPass = prompt("Enter new password");
  if (!newPass) return;

  alert("Password changed successfully (Demo)");
  // 🔐 Backend aane par yahin API call hogi
}

/* ================= CHANGE PHOTO ================= */
function changePhoto() {
  alert("Change Photo feature backend ke sath aayega");
}

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.replace("admin-login.html");
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadAdminProfile();
});
