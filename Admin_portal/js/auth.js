/* ==================================================
   ADMIN AUTH (CENTRAL GUARD FILE)
   Use this file on ALL admin pages
================================================== */

(function () {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  // 🚫 If admin not logged in → force login page
  if (isAdminLoggedIn !== "true") {
    window.location.replace("admin-login.html");
  }
})();

/* ==================================================
   SIDEBAR TOGGLE (MOBILE)
================================================== */
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.classList.toggle("show");
  }
}

/* ==================================================
   ADMIN LOGOUT
================================================== */
function adminLogout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem("adminLoggedIn");
    window.location.replace("admin-login.html");
  }
}
