import p5 from "p5";
import { PieceInBoard } from "../types/piece";
import { drawPiece, isPieceADouble } from "../components/piece";

const size = 50;

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

  let piece = initialPiece.pieceOnFirstHalf;
  let x = s.width / 2 - size / 2 - size * 2;
  let y = s.height / 2 - size / 2;
  let remainingX = 6;
  let remainingY = 2;
  let wasLastPieceADouble = true;
  let firstInLastTurn = true;

  while (piece != undefined) {
    if (remainingX > 0) {
      if (isPieceADouble(piece)) {
        y -= size / 2;
        x += size;
        drawPiece(s, piece, x, y, size, "vertical");
        y += size / 2;
        wasLastPieceADouble = true;
      } else {
        drawPiece(s, piece, x, y, size, "horizontal");
        wasLastPieceADouble = false;
      }
      x -= size * 2;
      remainingX--;
    } else if (remainingY > 0) {
      if (remainingY == 2) {
        x += size * 2;
        y -= wasLastPieceADouble ? size * 2.5 : size * 2;
      } else {
        y -= size * 2;
      }
      drawPiece(s, piece, x, y, size, "vertical");
      remainingY--;
    } else {
      if (isPieceADouble(piece)) {
        if (firstInLastTurn) {
          x -= size / 2;
          y -= size;
          drawPiece(s, piece, x, y, size, "horizontal");
          x += size * 2;
        } else {
          y -= size / 2;
          drawPiece(s, piece, x, y, size, "vertical");
          x += size;
          y += size / 2;
        }
      } else {
        if (firstInLastTurn) {
          x += size;
        }
        let points = [piece.pointsFirstHalf, piece.pointsSecondHalf];
        // flipping the points because otherwise, they'd be swapped
        drawPiece(
          s,
          { pointsFirstHalf: points[1], pointsSecondHalf: points[0] },
          x,
          y,
          size,
          "horizontal",
        );
        x += size * 2;
      }

      firstInLastTurn = false;
    }

    piece = piece.pieceOnFirstHalf;
  }

  piece = initialPiece.pieceOnSecondHalf;
  x = s.width / 2 + size / 2;
  y = s.height / 2 - size / 2;
  remainingX = 6;
  remainingY = 2;
  wasLastPieceADouble = true;
  firstInLastTurn = true;

  while (piece != undefined) {
    if (remainingX > 0) {
      if (isPieceADouble(piece)) {
        y -= size / 2;
        drawPiece(s, piece, x, y, size, "vertical");
        y += size / 2;
        wasLastPieceADouble = true;
        x += size;
      } else {
        drawPiece(s, piece, x, y, size, "horizontal");
        wasLastPieceADouble = false;
        x += size * 2;
      }
      remainingX--;
    } else if (remainingY > 0) {
      if (remainingY == 2) {
        x -= size;
        y += wasLastPieceADouble ? size * 1.5 : size;
      } else {
        y += size * 2;
      }
      drawPiece(s, piece, x, y, size, "vertical");
      remainingY--;
    } else {
      if (isPieceADouble(piece)) {
        if (firstInLastTurn) {
          x -= size / 2;
          y += size * 2;
          drawPiece(s, piece, x, y, size, "horizontal");
          x -= size * 2;
        } else {
          y -= size / 2;
          x += size;
          drawPiece(s, piece, x, y, size, "vertical");
          x -= size * 2;
          y += size / 2;
        }
      } else {
        if (firstInLastTurn) {
          x -= size * 2;
          y += size;
        }
        let points = [piece.pointsFirstHalf, piece.pointsSecondHalf];
        // flipping the points because otherwise, they'd be swapped
        drawPiece(
          s,
          { pointsFirstHalf: points[1], pointsSecondHalf: points[0] },
          x,
          y,
          size,
          "horizontal",
        );
        x -= size * 2;
      }

      firstInLastTurn = false;
    }

    piece = piece.pieceOnSecondHalf;
  }

  s.pop();
}
