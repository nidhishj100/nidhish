// ===========================================================
// NIDHISH J — PORTFOLIO RUNTIME ENGINE (MOBILE GUARD INTEGRATED)
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── MOBILE LAYOUT THRESHOLD DETECTION GUARD
    const isMobileDevice = window.matchMedia('(max-width: 868px)');

    // ── 1. INJECT SCROLL BAR INDICATOR INTO THE DOM
    const progressBarNode = document.createElement('div');
    progressBarNode.id = 'progressBar';
    document.body.prepend(progressBarNode);

    // ── 2. INJECT DESKTOP POINTER DOT & RING NODES
    const dotCursorElement = document.createElement('div');
    const ringCursorElement = document.createElement('div');
    dotCursorElement.id = 'cursor-dot';
    ringCursorElement.id = 'cursor-ring';
    document.body.appendChild(dotCursorElement);
    document.body.appendChild(ringCursorElement);

    // ── 3. RUNTIME THEME COMPILER LAYER
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            rootElement.setAttribute('data-theme', 'light');
            if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
        } else {
            rootElement.removeAttribute('data-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
        }
    }

    const cachedThemeValue = localStorage.getItem('theme') || 'dark';
    applyTheme(cachedThemeValue);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const targetedNextTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(targetedNextTheme);
            localStorage.setItem('theme', targetedNextTheme);
        });
    }

    // ── 4. SMOOTH LERP DESKTOP POINTER TRAILING CONTROLLER
    let currentMouseX = 0, currentMouseY = 0;
    let ringLerpX = 0, ringLerpY = 0;

    window.addEventListener('mousemove', (event) => {
        if (isMobileDevice.matches) return; // Prevent mobile coordinates tracking loop injection

        currentMouseX = event.clientX;
        currentMouseY = event.clientY;

        dotCursorElement.style.left = `${currentMouseX}px`;
        dotCursorElement.style.top = `${currentMouseY}px`;
    });

    function interpolationLoop() {
        if (!isMobileDevice.matches) {
            ringLerpX += (currentMouseX - ringLerpX) * 0.15;
            ringLerpY += (currentMouseY - ringLerpY) * 0.15;

            ringCursorElement.style.left = `${ringLerpX}px`;
            ringCursorElement.style.top = `${ringLerpY}px`;
        }
        requestAnimationFrame(interpolationLoop);
    }
    requestAnimationFrame(interpolationLoop);

    // Active pointer scaling binders for interactive nodes
    const interactiveTargets = document.querySelectorAll('a, button, .pro-card, .project-card, .contact-card, #themeToggle');
    interactiveTargets.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!isMobileDevice.matches) document.body.classList.add('cursor-hovering');
        });
        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hovering');
        });
    });

    // ── 5. MAGNETIC POSITION ENGINE FOR CALL TO ACTIONS
    document.querySelectorAll('.btn').forEach(buttonElement => {
        buttonElement.addEventListener('mousemove', (event) => {
            if (isMobileDevice.matches) return; // Skip magnetic jitter underneath responsive phone interactions

            const elementRect = buttonElement.getBoundingClientRect();
            const relativeShiftX = event.clientX - elementRect.left - elementRect.width / 2;
            const relativeShiftY = event.clientY - elementRect.top - elementRect.height / 2;

            buttonElement.style.transform = `translate(${relativeShiftX * 0.15}px, ${relativeShiftY * 0.15}px)`;
        });

        buttonElement.addEventListener('mouseleave', () => {
            buttonElement.style.transform = 'translate(0px, 0px)';
        });
    });

    // ── 6. GLASSMORPHIC 3D TILT ENGINE FOR GRID CONTAINER MODULES
    document.querySelectorAll('.pro-card, .project-card, .contact-card').forEach(cardElement => {
        cardElement.addEventListener('mousemove', (event) => {
            if (isMobileDevice.matches) return; // Do not apply matrix perspective tilts on small touch viewports

            const bounds = cardElement.getBoundingClientRect();
            const mouseX = event.clientX - bounds.left;
            const mouseY = event.clientY - bounds.top;
            const xRotation = ((mouseY / bounds.height) - 0.5) * -10;
            const yRotation = ((mouseX / bounds.width) - 0.5) * 10;

            cardElement.style.transform = `perspective(600px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
        });

        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
    });

    // ── 7. TEXT TYPING LOOP ENGINE
    const typingBoxContainer = document.querySelector('.typing-subtitle');
    if (typingBoxContainer) {
        const structuralRolesArray = [
            "Full Stack Developer.",
            "AI Enthusiast.",
            "UI/UX Designer.",
            "Cloud Computing Learner.",
            "IoT Developer."
        ];
        let roleIndex = 0, letterCharacterIndex = 0, deletionFlag = false;

        function renderTypeCycle() {
            const activeStringTarget = structuralRolesArray[roleIndex];
            typingBoxContainer.textContent = activeStringTarget.substring(0, deletionFlag ? letterCharacterIndex - 1 : letterCharacterIndex + 1);
            
            deletionFlag ? letterCharacterIndex-- : letterCharacterIndex++;
            let dynamicOperationalDelay = deletionFlag ? 50 : 100;

            if (!deletionFlag && letterCharacterIndex === activeStringTarget.length) {
                dynamicOperationalDelay = 1800; // Freeze focus visibility window
                deletionFlag = true;
            } else if (deletionFlag && letterCharacterIndex === 0) {
                deletionFlag = false;
                roleIndex = (roleIndex + 1) % structuralRolesArray.length;
                dynamicOperationalDelay = 500;
            }

            setTimeout(renderTypeCycle, dynamicOperationalDelay);
        }
        setTimeout(renderTypeCycle, 1200);
    }

    // ── 8. DYNAMIC CONNECTIVE NETWORK BACKGROUND
    const backgroundCanvas = document.getElementById('particles');
    if (backgroundCanvas) {
        const canvasContext = backgroundCanvas.getContext('2d');
        let particleMatrixStore = [];

        function setCanvasViewportDimensions() {
            backgroundCanvas.width = window.innerWidth;
            backgroundCanvas.height = window.innerHeight;
        }

        function generateMatrixDistribution() {
            // Lower particle generation metrics on mobile to maximize battery performance
            const standardDensityCap = isMobileDevice.matches ? 22 : 55;
            particleMatrixStore = [];
            
            for (let index = 0; index < standardDensityCap; index++) {
                particleMatrixStore.push({
                    x: Math.random() * backgroundCanvas.width,
                    y: Math.random() * backgroundCanvas.height,
                    vectorX: (Math.random() - 0.5) * 0.4,
                    vectorY: (Math.random() - 0.5) * 0.4
                });
            }
        }

        function cycleCanvasMatrixRender() {
            canvasContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            const isLightEnabled = rootElement.getAttribute('data-theme') === 'light';
            canvasContext.fillStyle = isLightEnabled ? 'rgba(14, 154, 102, 0.25)' : 'rgba(77, 255, 180, 0.25)';

            particleMatrixStore.forEach((particle, idx) => {
                canvasContext.beginPath();
                canvasContext.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
                canvasContext.fill();

                particle.x += particle.vectorX;
                particle.y += particle.vectorY;

                if (particle.x < 0 || particle.x > backgroundCanvas.width) particle.vectorX *= -1;
                if (particle.y < 0 || particle.y > backgroundCanvas.height) particle.vectorY *= -1;

                for (let comparisonIdx = idx + 1; comparisonIdx < particleMatrixStore.length; comparisonIdx++) {
                    const secondParticle = particleMatrixStore[comparisonIdx];
                    const radialDistanceVec = Math.hypot(particle.x - secondParticle.x, particle.y - secondParticle.y);
                    
                    if (radialDistanceVec < 110) {
                        canvasContext.beginPath();
                        canvasContext.moveTo(particle.x, particle.y);
                        canvasContext.lineTo(secondParticle.x, secondParticle.y);
                        
                        const normalizedAlphaValue = 0.12 * (1 - radialDistanceVec / 110);
                        canvasContext.strokeStyle = isLightEnabled ? 
                            `rgba(14, 154, 102, ${normalizedAlphaValue})` : 
                            `rgba(77, 255, 180, ${normalizedAlphaValue})`;
                        
                        canvasContext.lineWidth = 0.65;
                        canvasContext.stroke();
                    }
                }
            });
            requestAnimationFrame(cycleCanvasMatrixRender);
        }

        window.addEventListener('resize', () => { 
            setCanvasViewportDimensions(); 
            generateMatrixDistribution(); 
        });
        
        setCanvasViewportDimensions();
        generateMatrixDistribution();
        cycleCanvasMatrixRender();
    }

    // ── 9. SCROLL REVEAL VIEWPORT OBSERVER INTERNALS
    const interactiveSections = document.querySelectorAll('.pro-card, .project-card, .contact-card, .section-title, .page-title');
    interactiveSections.forEach(section => section.classList.add('reveal'));

    const viewportTrackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    interactiveSections.forEach(section => viewportTrackingObserver.observe(section));

    // ── 10. REAL-TIME PROGRESS BAR TRACKER 
    window.addEventListener('scroll', () => {
        const topDistance = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollableDeltaHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const renderingPercentage = scrollableDeltaHeight > 0 ? (topDistance / scrollableDeltaHeight) * 100 : 0;
        
        const targetBar = document.getElementById('progressBar');
        if (targetBar) targetBar.style.width = `${renderingPercentage}%`;
    });
});
