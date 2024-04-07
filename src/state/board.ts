import p5 from "p5";
import { PieceInBoard } from "../types/piece";
import { drawPiece, isPieceADouble } from "../components/piece";

const size = 50;
let remainingLeftX = 6;
let remainingLeftY = 3;
let remainingRightX = 6;
let remainingRightY = 3;

export function drawBoard(s: p5, initialPiece: PieceInBoard) {
  s.push();

  s.fill(255, 255, 255);
  s.stroke(0, 0, 0);

  // initial piece
  drawPiece(
    s,
    initialPiece,
    s.width / 2 - size / 2,
    s.height / 2 - size,
    size,
    "vertical",
  );

  let isFirstPiece = true;
  let piece = initialPiece.pieceOnFirstHalf;
  let x = s.width / 2 - size / 2 - size * 2;
  let y = s.height / 2 - size / 2;

  while (piece != undefined) {
    if (isPieceADouble(piece)) {
      y -= size / 2;
      x += size;
      drawPiece(s, piece, x, y, size, "vertical");
      y += size / 2;
    } else {
      drawPiece(s, piece, x, y, size, "horizontal");
    }
    x -= size * 2;
    piece = piece.pieceOnFirstHalf;
  }

  isFirstPiece = true;
  piece = initialPiece.pieceOnSecondHalf;
  x = s.width / 2 + size / 2;
  y = s.height / 2 - size / 2;

  while (piece != undefined) {
    if (isPieceADouble(piece)) {
      y -= size / 2;
      drawPiece(s, piece, x, y, size, "vertical");
      y += size / 2;
      x += size;
    } else {
      drawPiece(s, piece, x, y, size, "horizontal");
      x += size * 2;
    }
    piece = piece.pieceOnSecondHalf;
  }

  s.pop();
}
