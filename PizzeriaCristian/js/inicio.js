document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('nav a').forEach((link) =>{
        link.addEventListener('click', function(){
            document.querySelector('nav a.active').classList.remove('active');
            this.classList.add('active');
        });
    });
});

document.querySelectorAll("bi bi-list")