import { Piece } from "./piece";

export type Player = {
  id: number;
  name: string;
  pieces: (Piece | undefined)[];
  hasSkipped: boolean;
  isWinner: boolean;
  points: number;
  color: {
    r: number;
    g: number;
    b: number;
  };
};
