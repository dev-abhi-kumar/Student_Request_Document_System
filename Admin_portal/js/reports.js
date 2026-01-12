/* ================= AUTH CHECK ================= */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

/* ================= SIDEBAR ================= */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

/* ================= LOAD DATA ================= */
const requests = JSON.parse(localStorage.getItem("requests")) || [];

const totalEl = document.getElementById("reportTotal");
const pendingEl = document.getElementById("reportPending");
const approvedEl = document.getElementById("reportApproved");
const rejectedEl = document.getElementById("reportRejected");
const tableBody = document.getElementById("reportTableBody");

/* ================= GENERATE REPORT ================= */
function generateReport() {
  tableBody.innerHTML = "";

  let total = requests.length;
  let pending = requests.filter(r => r.status === "Pending").length;
  let approved = requests.filter(r => r.status === "Approved").length;
  let rejected = requests.filter(r => r.status === "Rejected").length;

  totalEl.textContent = total;
  pendingEl.textContent = pending;
  approvedEl.textContent = approved;
  rejectedEl.textContent = rejected;

  requests.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.reference}</td>
      <td>${r.studentName || "Unknown"}</td>
      <td>${r.enrollment}</td>
      <td>${r.document}</td>
      <td>${r.date}</td>
      <td>${r.status}</td>
    `;
    tableBody.appendChild(row);
  });
}

/* ================= PDF EXPORT ================= */
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("College Admin Portal - Report", 14, 15);

  const rows = requests.map(r => [
    r.reference,
    r.studentName || "Unknown",
    r.enrollment,
    r.document,
    r.status,
    r.date
  ]);

  doc.autoTable({
    head: [["Reference", "Student", "Enrollment", "Document", "Status", "Date"]],
    body: rows,
    startY: 20
  });

  doc.save("Document_Report.pdf");
}

/* ================= EXCEL EXPORT ================= */
function exportExcel() {
  const sheetData = [
    ["Reference", "Student", "Enrollment", "Document", "Status", "Date"],
    ...requests.map(r => [
      r.reference,
      r.studentName || "Unknown",
      r.enrollment,
      r.document,
      r.status,
      r.date
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  XLSX.writeFile(workbook, "Document_Report.xlsx");
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", generateReport);
