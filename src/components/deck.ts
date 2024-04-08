import p5 from "p5";
import { drawPiece } from "./piece";
import { Player } from "../types/player";

export function drawDeck(
  s: p5,
  player: Player,
  x: number,
  y: number,
  rotation: number,
  currentTurn: boolean,
) {
  s.push();

  s.translate(x, y);

  if (rotation != 0) {
    s.angleMode("degrees");
    s.rotate(rotation);
  }

  if (currentTurn) {
    s.fill(140, 3, 252);
  } else {
    s.fill(0, 0, 0);
  }
  s.textSize(30);
  s.text(player.name, 225, 25, s.width, s.height);

  if (player.hasSkipped) {
    s.fill(255, 0, 0);
    s.text("Paso", 400, 25, s.width, s.height);
  }

  if (player.isWinner) {
    s.fill(0, 255, 0);
    s.text("Ganó", 400, 25, s.width, s.height);
  }

  player.pieces.forEach((piece, index) => {
    if (piece != undefined) {
      drawPiece(s, piece, 20 + index * 80, 80, 50, "vertical");
    }
  });
  s.pop();
}
