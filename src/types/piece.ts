export type Piece = {
  pointsFirstHalf: number;
  pointsSecondHalf: number;
};

export type PieceInBoard = Piece & {
  pieceOnFirstHalf?: PieceInBoard;
  pieceOnSecondHalf?: PieceInBoard;
  ownedByPlayerId: number;
};
