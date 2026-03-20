// typing
const text=["IoT Developer","AI Enthusiast","Robotics Engineer"];
let i=0,j=0,cur="",del=false;

function type(){
if(i<text.length){
if(!del && j<=text[i].length){
cur=text[i].substring(0,j++);
}else{
del=true;
cur=text[i].substring(0,j--);
}
if(j==text[i].length) del=true;
if(j==0){del=false;i++;}
document.querySelector(".typing").innerHTML=cur;
}
setTimeout(type,100);
}
type();

// particles
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