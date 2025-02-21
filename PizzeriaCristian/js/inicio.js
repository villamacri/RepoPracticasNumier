document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelector("nav a.active").classList.remove("active");
      this.classList.add("active");
    });
  });

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const columnDcha = document.querySelector(".column-dcha");

  function toggleMenu() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("visible");
    columnDcha.classList.toggle("darken"); // Agregar clase para oscurecer
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  const submenuToggle = document.getElementById("submenu-toggle");
  const submenu = document.querySelector(".submenu");

  function toggleSubmenu() {
    submenu.classList.toggle("open-submenu");
    submenuToggle.querySelector(".arrow").classList.toggle("open-submenu");
  }
  submenuToggle.addEventListener("click", toggleSubmenu);
});
