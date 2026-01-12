/* ================= AUTH CHECK ================= */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

/* ================= SIDEBAR TOGGLE ================= */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

/* ================= LOAD REJECTED REQUESTS ================= */
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("rejectedRequestsBody");
  if (!tbody) return;

  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  const rejectedRequests = requests.filter(r => r.status === "Rejected");

  tbody.innerHTML = "";

  if (rejectedRequests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;">
          No rejected requests found
        </td>
      </tr>
    `;
    return;
  }

  rejectedRequests.forEach(req => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${req.reference}</td>
      <td>${req.studentName || "-"}</td>
      <td>${req.enrollment}</td>
      <td>${req.document}</td>
      <td>${req.rejectedDate || "-"}</td>
      <td><span class="status rejected">Rejected</span></td>
      <td>${req.rejectedReason || "Not specified"}</td>
    `;

    tbody.appendChild(row);
  });
});
