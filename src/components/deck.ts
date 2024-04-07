import p5 from "p5";
import { Piece } from "../types/piece";
import { drawPiece } from "./piece";

export function drawDeck(
  s: p5,
  title: string,
  pieces: (Piece | undefined)[],
  x: number,
  y: number,
  rotation: number,
) {
  s.push();

  s.translate(x, y);

  if (rotation != 0) {
    s.angleMode("degrees");
    s.rotate(rotation);
  }

  s.textSize(30);
  s.text(title, 225, 25, s.width, s.height);

  pieces.forEach((piece, index) => {
    if (piece != undefined) {
      drawPiece(s, piece, 20 + index * 80, 80, 50, "vertical");
    }
  });
  s.pop();
}
