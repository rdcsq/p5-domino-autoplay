export type Piece = {
  pointsFirstHalf: number;
  pointsSecondHalf: number;
};

export type PieceInBoard = Piece & {
  pieceOnFisrtHalf?: PieceInBoard;
  pieceOnSecondHalf?: PieceInBoard;
  ownedByPlayerId: number;
};
