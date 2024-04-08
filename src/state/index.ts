import { Piece, PieceInBoard } from "../types/piece";
import { Player } from "../types/player";
import { generatePiece } from "./generate-piece";

export class GameState {
  private currentTurn: number;
  private players: Player[];
  private initialPiece!: PieceInBoard;
  private leftMostPiece!: PieceInBoard;
  private rightMostPiece!: PieceInBoard;

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
          this.leftMostPiece = this.initialPiece;
          this.rightMostPiece = this.initialPiece;
          this.currentTurn = i;
          pieces.push();
        } else {
          pieces.push(piece);
        }
      }

      this.players.push({
        name: `Jugador ${i + 1}`,
        pieces,
        hasSkipped: false,
        isWinner: false,
      });
    }
  }

  getPlayers = () => this.players;

  getCurrentTurn = () => this.currentTurn;

  nextTurn = () => {
    if (this.players.find((player) => player.isWinner) != undefined) return;

    const p = this.players.find((player) => player.hasSkipped);
    if (p != undefined) {
      p.hasSkipped = false;
    }

    this.currentTurn += 1;
    if (this.currentTurn == 4) {
      this.currentTurn = 0;
    }

    // 50% to check left or right
    if (Math.random() > 0.5) {
      if (this.checkLeftPiece()) {
        return;
      }
      if (this.checkRightPiece()) {
        return;
      }
    } else {
      if (this.checkRightPiece()) {
        return;
      }
      if (this.checkLeftPiece()) {
        return;
      }
    }

    // TODO: pasa turno porque no tiene piezas
    this.players[this.currentTurn].hasSkipped = true;
  };

  private checkLeftPiece(): Boolean {
    const pieceLeftIndex = this.players[this.currentTurn].pieces.findIndex(
      (x) =>
        x != undefined &&
        (this.leftMostPiece.pointsFirstHalf == x.pointsFirstHalf ||
          this.leftMostPiece.pointsFirstHalf == x.pointsSecondHalf),
    );

    if (pieceLeftIndex != -1) {
      const piece = this.players[this.currentTurn].pieces[pieceLeftIndex]!;

      if (piece.pointsSecondHalf != this.leftMostPiece.pointsFirstHalf) {
        const points = [piece.pointsFirstHalf, piece.pointsSecondHalf];
        piece.pointsFirstHalf = points[1];
        piece.pointsSecondHalf = points[0];
      }

      this.leftMostPiece.pieceOnFirstHalf = {
        ...piece,
        ownedByPlayerId: this.currentTurn,
      };
      this.leftMostPiece = this.leftMostPiece.pieceOnFirstHalf!;
      this.players[this.currentTurn].pieces[pieceLeftIndex] = undefined;
      return true;
    }
    return false;
  }

  private checkRightPiece(): Boolean {
    const pieceRightIndex = this.players[this.currentTurn].pieces.findIndex(
      (x) =>
        x != undefined &&
        (this.rightMostPiece.pointsSecondHalf == x.pointsFirstHalf ||
          this.rightMostPiece.pointsSecondHalf == x.pointsSecondHalf),
    );
    if (pieceRightIndex != -1) {
      const piece = this.players[this.currentTurn].pieces[pieceRightIndex]!;

      if (piece.pointsFirstHalf != this.rightMostPiece.pointsSecondHalf) {
        const points = [piece.pointsFirstHalf, piece.pointsSecondHalf];
        piece.pointsFirstHalf = points[1];
        piece.pointsSecondHalf = points[0];
      }
      this.rightMostPiece.pieceOnSecondHalf = {
        ...piece,
        ownedByPlayerId: this.currentTurn,
      };
      this.rightMostPiece = this.rightMostPiece.pieceOnSecondHalf!;
      this.players[this.currentTurn].pieces[pieceRightIndex] = undefined;
      return true;
    }
    return false;
  }

  getInitialPiece = (): PieceInBoard => this.initialPiece;
}
