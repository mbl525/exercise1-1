const DIAMETER = 40;
let x = [];
let y = [];

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    x.push(mouseX);
    y.push(mouseY);
    if (x.length > 100) {
        x.shift();
        y.shift();
    }
    for (let i = 0; i < x.length; i++) {
        const alpha = 250 * (i / 100);
        const r = (x[i] / width) * 250;
        const b = (y[i] / height) * 250;
        fill(r, 250, b, alpha);
        circle(x[i], y[i], DIAMETER);
    }
}