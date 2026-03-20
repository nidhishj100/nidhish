const c=document.getElementById("particles");
const ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

let p=[];
for(let i=0;i<80;i++){
p.push({x:Math.random()*c.width,y:Math.random()*c.height});
}

function draw(){
ctx.clearRect(0,0,c.width,c.height);
p.forEach(e=>{
ctx.beginPath();
ctx.arc(e.x,e.y,2,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();
});
requestAnimationFrame(draw);
}
draw();