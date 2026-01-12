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

/* ================= LOAD APPROVED REQUESTS ================= */
const requests = JSON.parse(localStorage.getItem("requests")) || [];

const approvedRequests = requests.filter(r => r.status === "Approved");

const tbody = document.getElementById("approvedRequestsBody");

if (tbody) {
  tbody.innerHTML = "";

  if (approvedRequests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No approved documents</td></tr>`;
  }

  approvedRequests.forEach(req => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${req.reference}</td>
      <td>${req.studentName}</td>
      <td>${req.enrollment}</td>
      <td>${req.document}</td>
      <td>${req.date || "-"}</td>
      <td><span class="status approved">Approved</span></td>
      <td>
        <button class="view" onclick="downloadDocument('${req.file}')">
          Download
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* ================= DOWNLOAD FUNCTION ================= */
function downloadDocument(fileName) {
  if (!fileName) {
    alert("Document not available");
    return;
  }

  // 🔽 FRONTEND DEMO DOWNLOAD
  const link = document.createElement("a");
  link.href = "./documents/" + fileName;   // folder path
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
