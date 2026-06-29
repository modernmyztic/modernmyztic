const glow = document.getElementById("mouse-glow");

document.addEventListener("mousemove", (e)=>{

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});