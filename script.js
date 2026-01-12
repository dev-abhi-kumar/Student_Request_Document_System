const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

const loginBtn = document.getElementById("loginBtn");
const loginMenu = document.getElementById("loginMenu");

/* Mobile menu toggle */
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* Login dropdown toggle */
loginBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  loginMenu.style.display =
    loginMenu.style.display === "flex" ? "none" : "flex";
});

/* Close dropdown on outside click */
document.addEventListener("click", () => {
  loginMenu.style.display = "none";
});

const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
