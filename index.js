// ── TABS ──
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.dataset.tab;
        const tabsCard = btn.closest('.tabs-card');

        tabsCard.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabsCard.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(panel);
        targetPanel.classList.add('active');
        // transición suave de opacidad
        targetPanel.style.opacity = 0;
        setTimeout(() => targetPanel.style.opacity = 1, 50);
    });
});

// ── MENÚ HAMBURGUESA (móvil) ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('nav-open'); // overlay
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
    });
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
