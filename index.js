// ── CURSOR PERSONALIZADO ──
(function initCursor() {
    const ring = document.getElementById('cursorRing');
    const dot  = document.getElementById('cursorDot');

    if (!ring || !dot) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let visible = false;

    // Mostrar cursor al entrar en la ventana
    document.addEventListener('mouseenter', () => {
        if (!visible) {
            ring.style.opacity = '0.8';
            dot.style.opacity  = '1';
            visible = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        ring.style.opacity = '0';
        dot.style.opacity  = '0';
        visible = false;
    });

    // Dot: sigue el ratón directamente
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    });

    // Ring: sigue con ligero lag para efecto fluido
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover en elementos interactivos → amplía el ring
    const interactives = 'a, button, .interest-chip, .project-card, .service-card, .tab-btn';
    document.querySelectorAll(interactives).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
})();

// ── TABS ──
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panelId = btn.dataset.tab;
        const card    = btn.closest('.tabs-card');

        // Desactivar todos los botones y paneles del card
        card.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        card.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        // Activar el seleccionado
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('active');
    });
});

// ── MENÚ HAMBURGUESA (móvil) ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al pulsar un enlace
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar al pulsar fuera del menú
    document.addEventListener('click', e => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href   = anchor.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Dejar de observar una vez visible para ahorrar recursos
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .project-card').forEach(el => {
    revealObserver.observe(el);
});

// ── NAV: destacar sección activa al hacer scroll ──
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navItems.length) return;

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${id}`
                        ? 'var(--accent)'
                        : '';
                });
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
})();
