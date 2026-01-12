document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  const student = {
    name: document.getElementById("name").value,
    fatherName: document.getElementById("fatherName").value,
    motherName: document.getElementById("motherName").value,
    course: document.getElementById("course").value,
    branch: document.getElementById("branch").value,
    semester: document.getElementById("semester").value,
    year: document.getElementById("year").value,
    enrollment: document.getElementById("enrollment").value.trim(),
    roll: document.getElementById("roll").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    password: password.trim()
  };

  let students = JSON.parse(localStorage.getItem("students")) || [];

  const exists = students.find(s => s.enrollment === student.enrollment);
  if (exists) {
    alert("Enrollment number already registered");
    return;
  }

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  alert("Registration successful! Please login.");
  window.location.href = "login.html";
});
