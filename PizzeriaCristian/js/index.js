document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".language a.ingles img").forEach((link) => {
    link.addEventListener("click", function () {
      const activeLink = document.querySelector(".language a.español img.active");
      if(activeLink){
        activeLink.classList.remove("active");
      }
      this.classList.add("active");
      const languageButton = document.getElementById("language-button");
      languageButton.textContent = 'See menu';
    });
  });
  document.querySelectorAll(".language a.español img").forEach((link) => {
    link.addEventListener("click", function () {
      const activeLink = document.querySelector(".language a.ingles img.active");
      if(activeLink){
        activeLink.classList.remove("active");
        
      }
      this.classList.add("active");
      const languageButton= document.getElementById("language-button");
      languageButton.textContent = 'Ver carta';
    });
  });
});
