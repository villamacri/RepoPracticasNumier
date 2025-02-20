document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("language a").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelector("language a.active").classList.remove("active");
      this.classList.add("active");
    });
  });
});
