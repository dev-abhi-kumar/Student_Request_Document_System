/* ================= AUTH CHECK ================= */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

/* ================= SIDEBAR TOGGLE ================= */
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("show");
}

/* ================= LOAD REQUESTS ================= */
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("requestsTableBody");
  if (!tableBody) return;

  let requests = JSON.parse(localStorage.getItem("requests")) || [];

  function loadRequests() {
    tableBody.innerHTML = "";

    if (requests.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;">
            No requests found
          </td>
        </tr>`;
      return;
    }

    requests.forEach((req, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${req.reference}</td>
        <td>${req.studentName || "-"}</td>
        <td>${req.enrollment}</td>
        <td>${req.document}</td>
        <td>${req.date || "-"}</td>
        <td>
          <span class="status ${req.status.toLowerCase()}">
            ${req.status}
          </span>
        </td>
        <td>
          ${
            req.status === "Pending"
              ? `
                <button class="approve" onclick="approveRequest(${index})">Approve</button>
                <button class="reject" onclick="rejectRequest(${index})">Reject</button>
              `
              : "-"
          }
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  /* ================= APPROVE REQUEST ================= */
  window.approveRequest = function (index) {
    requests[index].status = "Approved";
    requests[index].approvedDate = new Date().toLocaleDateString();

    localStorage.setItem("requests", JSON.stringify(requests));
    alert("Request Approved");
    loadRequests();
  };

  /* ================= REJECT REQUEST ================= */
  window.rejectRequest = function (index) {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    requests[index].status = "Rejected";
    requests[index].rejectedReason = reason;   // ✅ FIXED NAME
    requests[index].rejectedDate = new Date().toLocaleDateString(); // ✅ DATE ADDED

    localStorage.setItem("requests", JSON.stringify(requests));
    alert("Request Rejected");
    loadRequests();
  };

  loadRequests();
});

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}
