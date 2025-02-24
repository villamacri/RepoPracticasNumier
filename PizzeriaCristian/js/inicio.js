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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  document.querySelector(".contenido").scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
document.getElementById("abrir-alergenos").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

document.getElementById("x").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

document.getElementById("overlay").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

document.getElementById("abrir-buscador").addEventListener("click", function(){
  document.getElementById("ventanaBusqueda").style.display = "block";
  });

document.getElementById("cerrar-buscador").addEventListener("click", function(){
  document.getElementById("ventanaBusqueda").style.display = "none";
});