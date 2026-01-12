function adminLogin(event) {
  event.preventDefault(); // ✅ STOP FORM RELOAD

  const adminId = document.getElementById("adminId").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  // 🔐 Hardcoded Admin Credentials (Frontend Demo)
  const ADMIN_ID = "admin";
  const ADMIN_PASS = "admin@123";

  if (adminId === "" || password === "") {
    alert("Please enter Admin ID and Password");
    return;
  }

  if (adminId === ADMIN_ID && password === ADMIN_PASS) {

    // ✅ ADMIN SESSION FLAG (FOR AUTH GUARD)
    localStorage.setItem("adminLoggedIn", "true");

    // ✅ ADMIN DETAILS OBJECT (FOR UI / FUTURE USE)
    const adminData = {
      username: adminId,
      role: "Administrator",
      loginTime: new Date().toISOString()
    };

    localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));

    alert("Admin Login Successful");

    // ✅ SAFE REDIRECT (NO BACK BUTTON ISSUE)
    window.location.replace("admin-dashboard.html");

  } else {
    alert("Invalid Admin ID or Password");
  }
}

// 👁️ Show / Hide Password
function togglePassword() {
  const pass = document.getElementById("adminPassword");
  pass.type = pass.type === "password" ? "text" : "password";
}
