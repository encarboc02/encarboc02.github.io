// ── TABS (Skills / Educación) ────────────────────────────────
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        // Desactivamos todos los botones y paneles
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Activamos el botón y panel correspondientes
        button.classList.add('active');
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

// ── NAVBAR (Efecto sombra y padding al hacer scroll) ────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '15px 0';
    }
});

// ── SMOOTH SCROLL PARA ENLACES INTERNOS ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - navbar.offsetHeight, // Ajusta según el navbar
                behavior: 'smooth'
            });
        }
    });
});

// ── TOGGLE MENÚ HAMBURGUESA (Responsive) ─────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
}
