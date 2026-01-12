// ===== AUTH CHECK =====
const loggedUser = localStorage.getItem("loggedInUser");
if (!loggedUser) {
  window.location.href = "login.html";
}

const student = JSON.parse(loggedUser);

// ===== SHOW STUDENT NAME =====
const nameEl = document.getElementById("studentName");
if (nameEl) {
  nameEl.textContent = student.name;
}

// ===== LOAD REQUESTS =====
const requests = JSON.parse(localStorage.getItem("requests")) || [];

// Only logged-in student requests
const myRequests = requests.filter(
  r => r.enrollment === student.enrollment
);

// ===== COUNTS =====
const total = myRequests.length;
const pending = myRequests.filter(r => r.status === "Pending").length;
const approved = myRequests.filter(r => r.status === "Approved").length;

// ===== UPDATE UI =====
document.getElementById("totalCount").textContent = total;
document.getElementById("pendingCount").textContent = pending;
document.getElementById("approvedCount").textContent = approved;

// ===== UPDATE TABLE =====
const tbody = document.getElementById("historyBody");
tbody.innerHTML = "";

myRequests.forEach(req => {
  const row = `
    <tr>
      <td>${req.reference}</td>
      <td>${req.document}</td>
      <td>
        <span class="status ${req.status.toLowerCase()}">
          ${req.status}
        </span>
      </td>
      <td>${req.date}</td>
    </tr>
  `;
  tbody.innerHTML += row;
});

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}