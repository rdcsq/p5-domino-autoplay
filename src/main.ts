import p5 from "p5";
import { drawDeck } from "./components/deck";
import { GameState } from "./state";
import { drawBoard } from "./state/board";

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

let nextTurnButton: p5.Element;

s.setup = () => {
  s.createCanvas(1920, 1080);
  nextTurnButton = s.createButton("Siguiente turno");
  nextTurnButton.mousePressed(gameState.nextTurn);
  nextTurnButton.position(100, 100);
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
  gameState.nextTurn();
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

  drawBoard(s, gameState.getInitialPiece());

  s.line(s.width / 2, 0, s.width / 2, s.height);
  s.line(0, s.height / 2, s.width, s.height / 2);
};
