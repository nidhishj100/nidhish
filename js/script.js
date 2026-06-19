// ===========================================================
// NIDHISH J — PORTFOLIO RUNTIME MOTOR
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. INJECT SCROLL BAR NODE IN THE DOM STACK
    const bar = document.createElement('div');
    bar.id = 'progressBar';
    document.body.prepend(bar);

    // 2. INJECT TRAILING CURSOR NODES (HIDDEN ON TOUCH SCREENS IN CSS)
    const dotNode = document.createElement('div');
    const ringNode = document.createElement('div');
    dotNode.id = 'cursor-dot';
    ringNode.id = 'cursor-ring';
    document.body.appendChild(dotNode);
    document.body.appendChild(ringNode);

    // 3. HARD INTERACTIVE LIGHT-DARK THEME LAYER
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
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    // 4. SMOOTH SPRING INTERPOLATING MOUSE TRAILING CONTROLLER
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dotNode.style.left = mouseX + 'px';
        dotNode.style.top = mouseY + 'px';
    });

    function lerpCursorRing() {
        // Delta timing tracking step loop for rubber-lag frame
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        ringNode.style.left = ringX + 'px';
        ringNode.style.top = ringY + 'px';
        requestAnimationFrame(lerpCursorRing);
    }
    requestAnimationFrame(lerpCursorRing);

    // Dynamic Hover listener bindings for standard user controls
    const triggerElements = document.querySelectorAll('a, button, .pro-card, #themeToggle');
    triggerElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
    });

    // 5. MAGNETIC POSITIONING TRANSFORM ENGINE FOR PRIMARY CALL-TO-ACTIONS
    const magneticButtons = document.querySelectorAll('.btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const boundary = btn.getBoundingClientRect();
            // Calculate center offsets relative to hover vectors
            const targetX = e.clientX - boundary.left - (boundary.width / 2);
            const targetY = e.clientY - boundary.top - (boundary.height / 2);
            
            // Deflect position matrix by 20% dampening weight
            btn.style.transform = `translate(${targetX * 0.2}px, ${targetY * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 6. SUBTITLE TYPING LOOP ENGINE
    const typingBox = document.querySelector('.typing-subtitle');
    if (typingBox) {
        const roles = [
            "Full Stack Developer.",
            "AI & Intelligent Systems Enthusiast.",
            "IoT Infrastructure Builder.",
            "Cloud Deployment Learner."
        ];
        let structuralIndex = 0, textCharacterIndex = 0, backwardDeletionFlag = false;

        function runTypingLoop() {
            const frameWordString = roles[structuralIndex];
            typingBox.textContent = frameWordString.substring(0, backwardDeletionFlag ? textCharacterIndex - 1 : textCharacterIndex + 1);
            backwardDeletionFlag ? textCharacterIndex-- : textCharacterIndex++;

            let dynamicTimerDelay = backwardDeletionFlag ? 40 : 80;

            if (!backwardDeletionFlag && textCharacterIndex === frameWordString.length) {
                dynamicTimerDelay = 1800; // Hold full word on screen
                backwardDeletionFlag = true;
            } else if (backwardDeletionFlag && textCharacterIndex === 0) {
                backwardDeletionFlag = false;
                structuralIndex = (structuralIndex + 1) % roles.length;
                dynamicTimerDelay = 400; // Pause briefly before writing next phrase
            }

            setTimeout(runTypingLoop, dynamicTimerDelay);
        }
        setTimeout(runTypingLoop, 800);
    }

    // 7. CANVAS CONNECTIVE NODE INFRASTRUCTURE BACKGROUND
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particleMatrix = [];

        function autoResizeCanvasContext() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function buildMatrixCluster() {
            const densityValue = Math.min(45, Math.floor((window.innerWidth * window.innerHeight) / 30000));
            particleMatrix = [];
            for (let i = 0; i < densityValue; i++) {
                particleMatrix.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35
                });
            }
        }

        function cycleCanvasUpdateRender() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isLightActive = root.getAttribute('data-theme') === 'light';
            ctx.fillStyle = isLightActive ? 'rgba(14, 165, 233, 0.25)' : 'rgba(0, 229, 255, 0.25)';

            particleMatrix.forEach((dot, index) => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                dot.x += dot.vx;
                dot.y += dot.vy;

                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

                // Build vector lattice nodes dynamically
                for (let j = index + 1; j < particleMatrix.length; j++) {
                    const dot2 = particleMatrix[j];
                    const distanceVector = Math.hypot(dot.x - dot2.x, dot.y - dot2.y);
                    if (distanceVector < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(dot2.x, dot2.y);
                        ctx.strokeStyle = isLightActive ? 
                            `rgba(14, 165, 233, ${0.12 * (1 - distanceVector / 100)})` : 
                            `rgba(0, 229, 255, ${0.12 * (1 - distanceVector / 100)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(cycleCanvasUpdateRender);
        }

        window.addEventListener('resize', () => { autoResizeCanvasContext(); buildMatrixCluster(); });
        autoResizeCanvasContext();
        buildMatrixCluster();
        cycleCanvasUpdateRender();
    }

    // 8. SCROLL VALUE BAR RECOGNITION LOGGER
    window.addEventListener('scroll', () => {
        const topViewportScrollDistance = document.documentElement.scrollTop || document.body.scrollTop;
        const totalScrollableDepth = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const completePercentage = totalScrollableDepth > 0 ? (topViewportScrollDistance / totalScrollableDepth) * 100 : 0;
        bar.style.width = completePercentage + '%';
    });
});
