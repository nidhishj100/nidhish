// ===========================================================
// NIDHISH J — PORTFOLIO SCRIPTS
// Particle field, theme toggle, scroll reveals, active navbar tracking
// ===========================================================

/* ---------- Theme toggle engine ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        root.removeAttribute('data-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
}

/* ---------- Particle background module loop ---------- */
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function getAccentColor() {
        const isLight = root.getAttribute('data-theme') === 'light';
        return isLight ? 'rgba(14, 165, 233,' : 'rgba(0, 229, 255,';
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
        const accentBase = getAccentColor();
        
        // Loop particles connections layout nodes
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = accentBase + ' 0.5)';
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            // Boundary collision check
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Render proximity node connection paths
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = accentBase + ` ${0.15 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        animationId = requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    drawParticles();
}

/* ---------- Scroll indicator tracker loop ---------- */
window.addEventListener("scroll", () => {
    const bar = document.getElementById("progressBar");
    if (bar) {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    }
});

/* ---------- Intersection element reveal loop animation ---------- */
const revealTargets = document.querySelectorAll('.reveal');
if (revealTargets.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(target => revealObserver.observe(target));
}

/* ---------- Dynamic Magnetic button tracking effects ---------- */
document.querySelectorAll('.magnet-target').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

/* ---------- Active link tracking synchronization ---------- */
const sections = document.querySelectorAll("main section, main div[id]");
const navLinks = document.querySelectorAll("nav a");
if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            if (window.scrollY >= top) {
                currentSectionId = sec.getAttribute("id") || "";
            }
        });
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(currentSectionId)) {
                    link.classList.add("active");
                }
            });
        }
    });
}
