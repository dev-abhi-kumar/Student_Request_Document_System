/* ================= AUTH CHECK ================= */
const adminData = localStorage.getItem("loggedInAdmin");

if (!adminData) {
  window.location.href = "admin-login.html";
}

// OPTIONAL: use admin info
const admin = JSON.parse(adminData);
// console.log(admin.name);


/* ================= SIDEBAR TOGGLE (MOBILE) ================= */
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("show");
}

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("loggedInAdmin");
  window.location.href = "admin-login.html";
}

/* ================= LOAD REQUEST DATA ================= */
// Student side se jo request aayi hogi
const requests = JSON.parse(localStorage.getItem("requests")) || [];

/* ================= DASHBOARD COUNTS ================= */
function loadDashboardStats() {
  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const approved = requests.filter(r => r.status === "Approved").length;
  const rejected = requests.filter(r => r.status === "Rejected").length;

  const totalEl = document.getElementById("totalRequests");
  const pendingEl = document.getElementById("pendingRequests");
  const approvedEl = document.getElementById("approvedRequests");
  const rejectedEl = document.getElementById("rejectedRequests");

  if (totalEl) totalEl.textContent = total;
  if (pendingEl) pendingEl.textContent = pending;
  if (approvedEl) approvedEl.textContent = approved;
  if (rejectedEl) rejectedEl.textContent = rejected;
}

/* ================= LOAD RECENT REQUESTS TABLE ================= */
function loadRecentRequests() {
  const tbody = document.getElementById("recentRequestsBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">No requests found</td></tr>`;
    return;
  }

  requests.slice(-5).reverse().forEach(req => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${req.reference}</td>
      <td>${req.studentName || "N/A"}</td>
      <td>${req.enrollment}</td>
      <td>${req.document}</td>
      <td>
        <span class="status ${req.status.toLowerCase()}">
          ${req.status}
        </span>
      </td>
      <td>
        <button class="view" onclick="viewRequest('${req.reference}')">
          View
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* ================= VIEW REQUEST ================= */
function viewRequest(ref) {
  localStorage.setItem("selectedRequest", ref);
  window.location.href = "student-requests.html";
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats();
  loadRecentRequests();
});
