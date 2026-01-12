document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enrollment = document.getElementById("loginEnrollment").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const students = JSON.parse(localStorage.getItem("students")) || [];

  if (students.length === 0) {
    alert("No account found. Please register first.");
    return;
  }

  const student = students.find(
    s => s.enrollment === enrollment && s.password === password
  );

  if (!student) {
    alert("Invalid Enrollment Number or Password");
    return;
  }

  // Save logged-in user (session)
  localStorage.setItem("loggedInUser", JSON.stringify(student));

  alert("Login successful!");
  window.location.href = "dashboard.html";
});