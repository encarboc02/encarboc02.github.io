// ── TABS ─────────────────────────────────────────────
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        // Quitamos la clase active a todos los botones y paneles
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Activamos el botón y panel seleccionados
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});
