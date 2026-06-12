// --- ULTRA-PRO PORTFOLIO PARTICLE ENGINE ---
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Handle high-DPI displays dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particlesArray = [];
    const numberOfParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 120);
    
    // Mouse tracking node
    const mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Object Blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Screen boundary bounce
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

            // Mouse interactive push/pull
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= dx / distance * force * 2;
                    this.y -= dy / distance * force * 2;
                }
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 242, 254, 0.7)'; // Cyan glow nodes
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize array
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Draw connecting neural lines
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    let opacity = (1 - (distance / 110)) * 0.15;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Main animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

// --- OPTIONAL HERO TYPING EFFECT ---
const typingElement = document.querySelector('.typing-subtitle');
if (typingElement) {
    const roles = ["Architecting Smart Systems", "AI & Machine Learning Developer", "IoT Solutions Engineer", "Robotics Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at full string
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1000);
}
const themeBtn = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light-mode");

if(themeBtn){
themeBtn.textContent="🌙";
}
}

themeBtn?.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

localStorage.setItem("theme","light");
themeBtn.textContent="🌙";

}else{

localStorage.setItem("theme","dark");
themeBtn.textContent="☀️";

}

});
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async (e) => {

```
e.preventDefault();

const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
};

try {

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz0gav0zDgMkPGdnQkT-OFvcHNcjftQDdIW4G7gJ4x2d0KYWpAABtHzVoZVmif6igTnTw/exec",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    alert("Message sent successfully!");
    contactForm.reset();

} catch (error) {

    console.error(error);
    alert("Failed to send message.");

}
```

});
const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", async function (e) {

```
e.preventDefault();

const data = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  message: document.getElementById("message").value
};

try {

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbz0gav0zDgMkPGdnQkT-OFvcHNcjftQDdIW4G7gJ4x2d0KYWpAABtHzVoZVmif6igTnTw/exec",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    }
  );

  alert("Message sent successfully!");
  contactForm.reset();

} catch (error) {

  console.error(error);
  alert("Failed to send message");

}
```

});

}
