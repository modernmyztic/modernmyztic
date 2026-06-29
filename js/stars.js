const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
const FAR_STAR_SPEED = 0.00064;
const MID_STAR_SPEED = 0.00128;
const BRIGHT_STAR_SPEED = 0.00176;

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const colors = [
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#F8F7D4",
    "#C8F1FF",
    "#DCCBFF"
];

class Star {

    constructor(layer) {
        this.layer = layer;
        this.reset(true);
    }

    reset(first = false) {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius =
            this.layer === 0
                ? Math.random() * 0.8 + 0.3
                : this.layer === 1
                ? Math.random() * 1.5 + 0.7
                : Math.random() * 2.8 + 1.4;

        this.alpha = Math.random();

        this.twinkleSpeed =
            Math.random() * 0.015 + 0.003;

        this.direction =
            Math.random() * Math.PI * 2;

        this.speed =
            this.layer * 0.02 +
            Math.random() * 0.03;

        this.color =
            colors[Math.floor(Math.random() * colors.length)];

        this.offset =
            Math.random() * 500;
    }

    update(time) {

    // Different breathing speeds depending on the star's size
    let speed;
    let amplitude;
    let baseAlpha;

    if (this.layer === 0) {
    speed = FAR_STAR_SPEED;
    amplitude = 0.12;
    baseAlpha = 0.45;
}
else if (this.layer === 1) {
    speed = MID_STAR_SPEED;
    amplitude = 0.25;
    baseAlpha = 0.55;
}
else {
    speed = BRIGHT_STAR_SPEED;
    amplitude = 0.35;
    baseAlpha = 0.60;
}

    this.alpha =
        baseAlpha +
        Math.sin(time * speed + this.offset) * amplitude;

}

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = this.color;

        ctx.globalAlpha = this.alpha;

        ctx.shadowBlur = this.radius * 7;

        ctx.shadowColor = this.color;

        ctx.fill();

if (this.layer === 2) {

    ctx.beginPath();

    ctx.arc(
        this.x,
        this.y,
        this.radius * 2.2,
        0,
        Math.PI * 2
    );

    ctx.globalAlpha = this.alpha * 0.12;

    ctx.fillStyle = this.color;

    ctx.fill();
}

        ctx.globalAlpha = 1;
    }

}

for (let i = 0; i < 240; i++)
    stars.push(new Star(0));

for (let i = 0; i < 80; i++)
    stars.push(new Star(1));

for (let i = 0; i < 8; i++)
    stars.push(new Star(2));

function animate(time) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update(time);
        star.draw();
    });

    requestAnimationFrame(animate);

}

animate();