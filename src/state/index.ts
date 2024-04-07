import { Piece, PieceInBoard } from "../types/piece";
import { generatePiece } from "./generate-piece";

export class GameState {
  private currentTurn: number;
  private players: {
    name: string;
    pieces: (Piece | undefined)[];
  }[];
  private initialPiece!: PieceInBoard;

  constructor() {
    this.currentTurn = 0;
    this.players = [];

    let generatedPieces: string[] = [];

    for (let i = 0; i < 4; i++) {
      let pieces: Piece[] = [];
      for (let j = 0; j < 7; j++) {
        let piece: Piece;

        do {
          piece = generatePiece();
          console.log(piece);
        } while (
          generatedPieces.find(
            (x) => `${piece.pointsFirstHalf}${piece.pointsSecondHalf}` == x,
          ) != undefined
        );

        generatedPieces.push(
          `${piece.pointsFirstHalf}${piece.pointsSecondHalf}`,
        );
        generatedPieces.push(
          `${piece.pointsSecondHalf}${piece.pointsFirstHalf}`,
        );

        if (piece.pointsFirstHalf == 6 && piece.pointsSecondHalf == 6) {
          this.initialPiece = {
            ...piece,
            ownedByPlayerId: i,
          };
          pieces.push();
        } else {
          pieces.push(piece);
        }
      }

      this.players.push({
        name: `Jugador ${i + 1}`,
        pieces,
      });
    }

    console.log(this.players);
  }

  getPlayers = () => this.players;

  getCurrentTurn = () => this.currentTurn;

  nextTurn = () => {};
}
