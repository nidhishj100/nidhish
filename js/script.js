// ===========================================================
// NIDHISH J — PORTFOLIO SCRIPTS
// Particle field, theme toggle, scroll reveals
// ===========================================================

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        root.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

/* ---------- Particle / circuit-node background ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getAccentColor() {
    const isLight = root.getAttribute('data-theme') === 'light';
    return isLight ? 'rgba(14, 154, 102,' : 'rgba(77, 255, 180,';
}

function createParticles() {
    const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 25000));
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = getAccentColor();
    const maxDist = 140;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
                ctx.strokeStyle = `${accent} ${(1 - dist / maxDist) * 0.12})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
            }
        }

        ctx.fillStyle = `${accent} 0.35)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }

    animationId = requestAnimationFrame(drawParticles);
}

function initParticles() {
    resizeCanvas();
    createParticles();
    if (animationId) cancelAnimationFrame(animationId);
    drawParticles();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    initParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
} else {
    resizeCanvas();
}

/* ---------- Scroll reveal for cards & timeline ---------- */
const revealTargets = document.querySelectorAll('.pro-card, .timeline-item, .cta-title, .cta-sub');

revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

if (prefersReducedMotion) {
    revealTargets.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
}
// ===================================
// HERO TYPING EFFECT
// ===================================

const typingElement = document.querySelector('.typing-subtitle');

if (typingElement) {

    const roles = [
        "Full Stack Developer",
        "AI Enthusiast",
        "UI/UX Designer",
        "Cloud Computing Learner",
        "IoT Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent =
                currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent =
                currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 1800;
            isDeleting = true;
        }

        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}
// ===================================
// COUNTER ANIMATION
// ===================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let count = 0;

            const updateCounter = () => {
                const increment = target / 100;

                if(count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(counter => counterObserver.observe(counter));
// ===================================
// ACTIVE NAVBAR SECTION
// ===================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================

document.querySelectorAll('.btn').forEach(button => {

    button.addEventListener('mousemove', e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0,0)';
    });
});
// ===================================
// SCROLL PROGRESS BAR
// ===================================

window.addEventListener("scroll", () => {

    const winScroll =
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled =
        (winScroll / height) * 100;

    document.getElementById("progressBar").style.width =
        scrolled + "%";
});
