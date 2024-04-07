import { Piece, PieceInBoard } from "../types/piece";

export class GameState {
  private currentTurn: number;
  private players: {
    name: string;
    pieces: (Piece | undefined)[];
  }[];
  //   private initialPiece!: PieceInBoard;

  constructor() {
    this.currentTurn = 0;
    this.players = [];

    for (let i = 0; i < 4; i++) {
      let pieces: Piece[] = [];
      for (let j = 0; j < 7; j++) {
        let piece = {
          pointsFirstHalf: Math.floor(Math.random() * 7),
          pointsSecondHalf: Math.floor(Math.random() * 7),
        };

        // if (piece.pointsFirstHalf == 6 && piece.pointsSecondHalf == 6) {
        //   this.initialPiece = {
        //     ...piece,
        //     ownedByPlayerId: i,
        //   };
        //   pieces.push();
        //   return;
        // }

        pieces.push(piece);
      }

      this.players.push({
        name: `Jugador ${i + 1}`,
        pieces,
      });
    }
  }

  getPlayers = () => this.players;

  getCurrentTurn = () => this.currentTurn;

  nextTurn = () => {};
}
