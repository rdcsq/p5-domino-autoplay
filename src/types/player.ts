import { Piece } from "./piece";

export type Player = {
  name: string;
  pieces: (Piece | undefined)[];
  hasSkipped: boolean;
  isWinner: boolean;
};
