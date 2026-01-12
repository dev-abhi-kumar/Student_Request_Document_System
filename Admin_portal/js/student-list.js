const requests = JSON.parse(localStorage.getItem("requests")) || [];
const tbody = document.getElementById("studentsTableBody");

const studentsMap = {};

requests.forEach(req => {
  if (!studentsMap[req.enrollment]) {
    studentsMap[req.enrollment] = {
      name: req.studentName || "Unknown",
      enrollment: req.enrollment,
      course: req.course || "Not specified",
      total: 0
    };
  }
  studentsMap[req.enrollment].total++;
});

tbody.innerHTML = "";

Object.values(studentsMap).forEach(student => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.enrollment}</td>
    <td>${student.course}</td>
    <td>${student.total}</td>
  `;
  tbody.appendChild(row);
});
