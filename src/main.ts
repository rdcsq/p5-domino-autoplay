import p5 from "p5";
import { drawDeck } from "./components/deck";
import { GameState } from "./state";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

let gameState = new GameState();
let positions = [
  [700, 800],
  [300, 225],
  [1280, 250],
  [1600, 800],
];

s.setup = () => {
  s.createCanvas(1920, 1080);
};

s.draw = () => {
  s.background(255, 255, 255);
  s.fill(0, 0, 0);
  s.text(gameState.getCurrentTurn(), 0, 10, 100);

  gameState.getPlayers().forEach(({ name, pieces }, i) => {
    drawDeck(
      s,
      name,
      pieces,
      positions[i][0],
      positions[i][1],
      90 * i,
      gameState.getCurrentTurn() == i,
    );
  });
};
