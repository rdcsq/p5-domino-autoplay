import p5 from "p5";

type PieceRotation = "horizontal" | "vertical";

export function drawPiece(
  s: p5,
  firstHalf: number,
  secondHalf: number,
  x: number,
  y: number,
  size: number,
  pieceRotation: PieceRotation,
) {
  if (firstHalf < 0 || firstHalf > 6 || secondHalf < 0 || secondHalf > 6)
    throw Error("number of dots is out of range");

  let width = size,
    height = size;

  if (pieceRotation == "horizontal") {
    width *= 2;
  } else {
    height *= 2;
  }

  s.push();
  s.fill(255, 255, 255);
  s.stroke(0, 0, 0);

  s.rect(x, y, width, height);

  let lineXStart: number;
  let lineXEnd: number;
  let lineYStart: number;
  let lineYEnd: number;

  if (pieceRotation == "horizontal") {
    lineXStart = x + width / 2;
    lineXEnd = lineXStart;
    lineYStart = y;
    lineYEnd = y + height;
  } else {
    lineXStart = x;
    lineXEnd = x + width;
    lineYStart = y + height / 2;
    lineYEnd = lineYStart;
  }

  s.line(lineXStart, lineYStart, lineXEnd, lineYEnd);

  s.fill(0, 0, 0);

  if (firstHalf > 0)
    drawDotGrid(
      s,
      firstHalf,
      x,
      y,
      pieceRotation == "horizontal" ? width / 2 : width,
      pieceRotation,
    );

  if (secondHalf > 0)
    drawDotGrid(
      s,
      secondHalf,
      pieceRotation == "horizontal" ? x + width / 2 : x,
      pieceRotation == "horizontal" ? y : y + height / 2,
      pieceRotation == "horizontal" ? width / 2 : width,
      pieceRotation,
    );

  s.pop();
}

function drawDotGrid(
  s: p5,
  dots: number,
  x: number,
  y: number,
  size: number, // size of square in which its contained
  pieceRotation: PieceRotation,
) {
  const spacing = size / 10;
  const d = size * 0.2;

  if (dots < 6) {
    // middle dot
    if (dots == 5 || dots == 1 || dots == 3) {
      s.circle(x + size / 2, y + size / 2, d);
    }

    if (dots == 1) return;

    x += d / 2;
    y += d / 2;

    // dot top left
    s.circle(x + spacing, y + spacing, d);
    // dot bottom right
    s.circle(x + size - spacing - d, y + size - spacing - d, d);

    if (dots >= 4) {
      // dot top right
      s.circle(x + size - spacing - d, y + spacing, d);
      // dot bottom left
      s.circle(x + spacing, y + size - spacing - d, d);
    }
  } else {
    if (pieceRotation == "horizontal") {
      x += d / 2 + spacing;
      y += size * 0.2 + spacing;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          s.circle(x + i * (d + spacing), y + j * (d + spacing * 2), d);
        }
      }
    } else {
      y += d / 2 + spacing;
      x += size * 0.2 + spacing;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
          s.circle(x + j * (d + spacing * 2), y + i * (d + spacing), d);
        }
      }
    }
  }
}
