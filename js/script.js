const text = ["AI Developer", "IoT Engineer", "Web Developer"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
if (i < text.length) {
if (!isDeleting && j <= text[i].length) {
current = text[i].substring(0, j++);
} else {
isDeleting = true;
current = text[i].substring(0, j--);
}

if (j == text[i].length) isDeleting = true;
if (j == 0) {
isDeleting = false;
i++;
}

document.querySelector(".typing").innerHTML = current;
}

setTimeout(type, 100);
}

type();

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
particles.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 2
});
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

particles.forEach(p => {
ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = "#38bdf8";
ctx.fill();

p.y -= 0.3;
if (p.y < 0) p.y = canvas.height;
});

requestAnimationFrame(draw);
}

draw();