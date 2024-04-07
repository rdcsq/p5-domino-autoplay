import p5 from "p5";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

s.setup = () => {
  s.createCanvas(1920, 1080);
};

s.draw = () => {
  s.background(255, 255, 255);
  s.fill(0, 0, 0);
  s.text(`${s.width}x${s.height}`, 0, 10, 100);
};
