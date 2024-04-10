import p5 from "p5";
import { drawDeck } from "./components/deck";
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

  s.push();
  s.textSize(30);
  s.textAlign("center");
  s.text(`Juego ${simulation.getCurrentGameId() + 1}`, s.width / 2, 40);
  s.pop();

  if (simulation.getCurrentGameId() > 0) {
    s.push();
    s.textSize(25);
    s.angleMode("degrees");

    let y = 25;
    let arcStart = 0;
    gameState.getPlayers().forEach((player, index) => {
      s.fill(player.color.r, player.color.g, player.color.b);

      let playerTimesWon = simulation.getTimesPlayerWon()[index];
      let arcEnd = s.map(
        playerTimesWon,
        0,
        simulation.getCurrentGameId() + 1,
        0,
        360,
      );
      s.arc(350, 100, 100, 100, arcStart, arcStart + arcEnd, "pie");
      arcStart += arcEnd;

      let percentage = s.map(
        playerTimesWon,
        0,
        simulation.getCurrentGameId() + 1,
        0,
        100,
      );

      y += 25;
      s.text(
        `${player.name}: ${playerTimesWon} (${Math.round(percentage)}%)`,
        50,
        y,
        s.width,
        s.height,
      );
    });
    s.pop();

    s.push();
    s.textSize(30);
    s.textAlign("right");
    s.text(
      `Empates: ${simulation.getTies()}/${simulation.getCurrentGameId()} (${((simulation.getTies() / simulation.getCurrentGameId()) * 100).toFixed(2)}%)`,
      0,
      50,
      s.width - 50,
    );
    s.pop();
  }

  if (simulation.getHasFinished()) {
    s.noLoop();
  }

  drawBoard(s, gameState.getInitialPiece());
};
