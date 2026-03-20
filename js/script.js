// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";
});

// TYPING EFFECT
const text = ["IoT Developer", "AI Enthusiast", "Robotics Engineer"];
let i=0, j=0, current="", isDeleting=false;

function type() {
    if(i<text.length){
        if(!isDeleting && j<=text[i].length){
            current=text[i].substring(0,j++);
        } else {
            isDeleting=true;
            current=text[i].substring(0,j--);
        }

        if(j==text[i].length) isDeleting=true;
        if(j==0){ isDeleting=false; i++; }

        document.querySelector(".typing").innerHTML=current;
    }
    setTimeout(type,100);
}

type();