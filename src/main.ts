import p5 from "p5";
import { drawPiece } from "./components/piece";

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

  drawPiece(s, 0, 0, 50, 50, 50, "horizontal");

  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 6; j++) {
      drawPiece(
        s,
        { pointsFirstHalf: i, pointsSecondHalf: j },
        40 + 100 * i + 10 * i,
        40 + 50 * j + 10 * j,
        50,
        "horizontal",
      );
      drawPiece(
        s,
        { pointsFirstHalf: i, pointsSecondHalf: j },
        960 + 50 * i + 10 * i,
        40 + 100 * j + 10 * j,
        50,
        "vertical",
      );
    }
  }
};
