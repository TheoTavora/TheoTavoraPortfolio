function mudarClasseNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-ativa');
        } else {
            navbar.classList.remove('navbar-ativa');
        }
    });
}

document.addEventListener('DOMContentLoaded', mudarClasseNavbar);

