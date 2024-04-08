import p5 from "p5";
import { drawDeck } from "./components/deck";
import { GameState } from "./state";
import { drawBoard } from "./state/board";
import { Simulation } from "./simulation";

// @ts-ignore
window.p5 = p5;
// @ts-ignore
const s: p5 = window;

let simulation: Simulation;
let positions = [
  [675, 850],
  [225, 250],
  [1250, 250],
  [1600, 825],
];

let nextTurnButton: p5.Element;

s.setup = () => {
  s.createCanvas(1920, 1080);
  const numberOfGames = Number.parseInt(
    prompt("Cantidad de juegos a jugar:") ?? "1",
  );
  simulation = new Simulation(numberOfGames);
  simulation.start();
};

s.draw = () => {
  const gameState = simulation.getCurrentGame();
  s.background(255, 255, 255);
  s.fill(0, 0, 0);

  gameState.getPlayers().forEach((player, i) => {
    drawDeck(
      s,
      player,
      positions[i][0],
      positions[i][1],
      90 * i,
      gameState.getCurrentTurn() == i,
      true,
    );
  });

  if (gameState.getWinner() != undefined) {
    s.push();
    s.textSize(30);
    s.textAlign("center");
    s.text(`Ganó ${gameState.getWinner()!.name}`, s.width / 2, 40);
    s.pop();
  }

  drawBoard(s, gameState.getInitialPiece());
};
