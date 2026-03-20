// typing
const text=["IoT Developer","AI Enthusiast","Robotics Engineer"];
let i=0,j=0,current="",del=false;

function type(){
if(i<text.length){
if(!del && j<=text[i].length){
current=text[i].substring(0,j++);
}else{
del=true;
current=text[i].substring(0,j--);
}
if(j==text[i].length) del=true;
if(j==0){del=false;i++;}
document.querySelector(".typing").innerHTML=current;
}
setTimeout(type,100);
}
type();

// particles
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let p=[];
for(let i=0;i<60;i++){
p.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:2});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
p.forEach(e=>{
ctx.beginPath();
ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();
});
requestAnimationFrame(draw);
}
draw();