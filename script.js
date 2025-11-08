/* =========================
   ELEMENTOS PRINCIPALES
========================= */
const loginBtn = document.getElementById('login-btn');
const loginScreen = document.querySelector('.login-screen');
const fondo = document.querySelector('section.fondo');
const iconos = document.querySelector('section.iconos');
const taskbarSup = document.querySelector('.taskbar_superior');
const taskbarInf = document.querySelector('.taskbar_inferior');

/* =========================
   RELOJ
========================= */
function updateClock() {
    const clock = document.querySelector('.mac-clock');
    if (!clock) return;
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${day}/${month} | ${hours}:${minutes}`;
}

/* =========================
   LOGIN
========================= */
loginBtn.addEventListener('click', () => {
    loginScreen.classList.add('fade-out');
    setTimeout(() => {
        loginScreen.style.display = 'none';
        fondo.classList.add('active');
        iconos.classList.add('active');
        taskbarSup.classList.add('active');
        taskbarInf.classList.add('active');

        updateClock();
        setInterval(updateClock, 1000);
    }, 1000);
});

/* =========================
   MODALES Y TASKBAR INDICADORES
========================= */
const modals = document.querySelectorAll('.modal');
const taskbarIcons = {
    'skills-modal': document.getElementById('taskbar-skills'),
    'about-modal': document.getElementById('taskbar-about'),
    'projects-modal': document.getElementById('taskbar-projects'),
    'contact-modal': document.getElementById('taskbar-contact')
};

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
    taskbarIcons[modalId].classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        taskbarIcons[modal.id].classList.remove('active');
    }, 1200);
}

/* Abrir modal al clicar iconos de escritorio */
document.querySelectorAll('.icono').forEach(icon => {
    icon.addEventListener('click', () => {
        const modalId = icon.id + '-modal';
        openModal(modalId);
    });
});

/* Cerrar modales al clicar la X */
modals.forEach(modal => {
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => closeModal(modal));

    // Cerrar al clicar fuera
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
    });
});

/* Abrir modal desde menú inicio */
const startMenu = document.getElementById('start-menu');
startMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.dataset.modal;
        openModal(modalId);
        startMenu.style.display = 'none';
    });
});

/* =========================
   MENÚ DE INICIO (WINDOWS)
========================= */
const startBtn = document.querySelector('.icono_cl');
startBtn.addEventListener('click', e => {
    e.stopPropagation();
    startMenu.style.display = (startMenu.style.display === 'flex') ? 'none' : 'flex';
});
window.addEventListener('click', e => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) startMenu.style.display = 'none';
});

/* =========================
   PANEL BYE BYE + APAGADO
========================= */
const appleIcon = document.querySelector('.mac-left i');
const byePanel = document.getElementById('bye-panel');
const shutdownScreen = document.getElementById('shutdown-screen');

appleIcon.addEventListener('click', () => {
    byePanel.style.display = 'flex';
    requestAnimationFrame(() => byePanel.classList.add('show'));

    byePanel.addEventListener('click', () => {
        byePanel.classList.remove('show');
        setTimeout(() => {
            byePanel.style.display = 'none';
            shutdownScreen.style.opacity = 1;
            shutdownScreen.style.pointerEvents = 'auto';
        }, 300);
    }, { once: true });
});
