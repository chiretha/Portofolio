// Theme switcher, theme preference, current year, and active navigation.
const htmlElement = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";

  themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  themeText.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Aktifkan light mode" : "Aktifkan dark mode"
  );

  // Simpan pilihan tema agar tetap digunakan saat halaman dibuka kembali.
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// Tahun copyright otomatis.
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Menutup menu Bootstrap setelah link navigasi dipilih pada layar kecil.
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navCollapse = document.getElementById("mainNav");
    if (navCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

// Penanda menu aktif sesuai section yang sedang terlihat.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));