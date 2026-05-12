document.addEventListener("DOMContentLoaded", () => {

    // ───────── CURSOR PERSONALIZADO ─────────
    (function initCursor() {
        const ring = document.getElementById('cursorRing');
        const dot  = document.getElementById('cursorDot');

        // Si no existe el cursor en HTML, salimos sin romper nada
        if (!ring || !dot) return;

        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;
        let visible = false;

        document.addEventListener('mouseenter', () => {
            ring.style.opacity = '0.8';
            dot.style.opacity = '1';
            visible = true;
        });

        document.addEventListener('mouseleave', () => {
            ring.style.opacity = '0';
            dot.style.opacity = '0';
            visible = false;
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animateRing);
        }

        animateRing();

        const interactives = 'a, button, .interest-chip, .project-card, .service-card, .tab-btn';

        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

    })();


    // ───────── TABS ─────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {

            const panelId = btn.dataset.tab;
            const card = btn.closest('.tabs-card');

            if (!card) return;

            card.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            card.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');

            const panel = card.querySelector(`#${panelId}`);
            if (panel) panel.classList.add('active');
        });
    });


    // ───────── MENÚ MÓVIL ─────────
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');

    if (navToggle && navLinks) {

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    }


    // ───────── SMOOTH SCROLL SEGURO ─────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {

            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            const navHeight = document.getElementById('navbar')?.offsetHeight || 70;

            window.scrollTo({
                top: target.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });


    // ───────── SCROLL REVEAL ─────────
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .project-card').forEach(el => {
        revealObserver.observe(el);
    });


    // ───────── NAV ACTIVE SECTION ─────────
    const sections = document.querySelectorAll('[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    if (sections.length && navItems.length) {

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    const id = entry.target.id;

                    navItems.forEach(a => {
                        a.classList.toggle(
                            'active',
                            a.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(sec => sectionObserver.observe(sec));
    }

});
