/* ================= AUTH CHECK ================= */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

/* ================= SIDEBAR TOGGLE ================= */
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("show");
}

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

/* ================= LOAD REQUESTS ================= */
let requests = JSON.parse(localStorage.getItem("requests")) || [];
const tableBody = document.getElementById("pendingRequestsBody");

function loadPendingRequests() {
  tableBody.innerHTML = "";

  const pendingRequests = requests.filter(
    req => req.status === "Pending"
  );

  if (pendingRequests.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;">
          No pending requests found
        </td>
      </tr>`;
    return;
  }

  pendingRequests.forEach(req => {
    const index = requests.findIndex(r => r.reference === req.reference);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${req.reference}</td>
      <td>${req.studentName}</td>
      <td>${req.enrollment}</td>
      <td>${req.document}</td>
      <td>${req.date}</td>
      <td>
        <span class="status pending">Pending</span>
      </td>
      <td>
        <button class="approve" onclick="approveRequest(${index})">
          Approve
        </button>
        <button class="reject" onclick="rejectRequest(${index})">
          Reject
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/* ================= APPROVE ================= */
function approveRequest(index) {
  requests[index].status = "Approved";
  localStorage.setItem("requests", JSON.stringify(requests));
  alert("Request Approved Successfully");
  loadPendingRequests();
}

/* ================= REJECT ================= */
function rejectRequest(index) {
  const reason = prompt("Enter rejection reason:");
  if (!reason) return;

  requests[index].status = "Rejected";
  requests[index].rejectReason = reason;

  localStorage.setItem("requests", JSON.stringify(requests));
  alert("Request Rejected");
  loadPendingRequests();
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", loadPendingRequests);