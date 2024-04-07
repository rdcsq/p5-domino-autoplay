import { MontecarloTable } from "../types/montecarlo";
import { Piece } from "../types/piece";

const probability: MontecarloTable = [
  {
    result: 0,
    probability: 1 / 7,
    accumulatedProbability: 1 / 7,
    interval: "0 - 1/7",
  },
  {
    result: 1,
    probability: 1 / 7,
    accumulatedProbability: 2 / 7,
    interval: "1/7 - 2/7",
  },
  {
    result: 2,
    probability: 1 / 7,
    accumulatedProbability: 3 / 7,
    interval: "2/7 - 3/7",
  },
  {
    result: 3,
    probability: 1 / 7,
    accumulatedProbability: 4 / 7,
    interval: "3/7 - 4/7",
  },
  {
    result: 4,
    probability: 1 / 7,
    accumulatedProbability: 5 / 7,
    interval: "4/7 - 5/7",
  },
  {
    result: 5,
    probability: 1 / 7,
    accumulatedProbability: 6 / 7,
    interval: "5/7 - 6/7",
  },
  {
    result: 6,
    probability: 1 / 7,
    accumulatedProbability: 7 / 7,
    interval: "6/7 - 7/7",
  },
];

function generatePieceSideDots() {
  const result = Math.random();

  for (let i = 0; i < probability.length; i++) {
    if (probability[i].accumulatedProbability >= result) {
      return i;
    }
  }

  return probability.length - 1;
}

export function generatePiece(): Piece {
  return {
    pointsFirstHalf: generatePieceSideDots(),
    pointsSecondHalf: generatePieceSideDots(),
  };
}
