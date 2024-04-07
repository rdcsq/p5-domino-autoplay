import p5 from "p5";
import { drawPiece } from "./components/piece";
import { drawDeck } from "./components/deck";
import { Piece } from "./types/piece";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

let pieces: Piece[] = [];

s.setup = () => {
  s.createCanvas(1920, 1080);

  for (let i = 0; i < 7; i++) {
    pieces.push({
      pointsFirstHalf: Math.floor(Math.random() * 7),
      pointsSecondHalf: Math.floor(Math.random() * 7),
    });
  }
};

s.draw = () => {
  s.background(255, 255, 255);
  s.fill(0, 0, 0);
  s.text(`${s.width}x${s.height}`, 0, 10, 100);

  drawDeck(s, "Jugador 1", pieces, 700, 800, 0);
  drawDeck(s, "Jugador 2", pieces, 300, 225, 90);
  drawDeck(s, "Jugador 3", pieces, 1280, 250, 180);
  drawDeck(s, "Jugador 4", pieces, 1600, 800, 270);
};
