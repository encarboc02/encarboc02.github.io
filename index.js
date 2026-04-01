// TABS
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

// NAVBAR SHADOW
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if(window.scrollY>50) { navbar.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'; navbar.style.padding='10px 0'; }
    else { navbar.style.boxShadow='none'; navbar.style.padding='20px 0'; }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
        e.preventDefault();
        const target=document.querySelector(this.getAttribute('href'));
        if(target){ window.scrollTo({top:target.offsetTop-80, behavior:'smooth'}); }
    });
});

// CURSOR PERSONALIZADO
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
