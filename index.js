// ── TABS ──
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.dataset.tab;
        btn.closest('.tabs-card').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.closest('.tabs-card').querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(panel).classList.add('active');
    });
});
 
// ── MENÚ HAMBURGUESA (móvil) ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        }
    });
});
 
// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
 
document.querySelectorAll('.service-card, .project-card').forEach(el => {
    observer.observe(el);
});
