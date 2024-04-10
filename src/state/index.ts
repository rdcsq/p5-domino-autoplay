import { Piece, PieceInBoard } from "../types/piece";
import { Player } from "../types/player";
import { generatePiece } from "./generate-piece";

const colors: { r: number; g: number; b: number }[] = [
  { r: 66, g: 135, b: 245 },
  { r: 166, g: 40, b: 113 },
  { r: 121, g: 207, b: 45 },
  { r: 207, g: 115, b: 45 },
];

export class GameState {
  private currentTurn: number;
  private players: Player[];
  private initialPiece!: PieceInBoard;
  private leftMostPiece!: PieceInBoard;
  private rightMostPiece!: PieceInBoard;
  private skipCount: number;
  private winners?: Player[];

  constructor() {
    this.currentTurn = 0;
    this.players = [];
    this.skipCount = 0;

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

      let points = pieces.reduce((x, piece) => {
        if (piece.pointsFirstHalf == 0 && piece.pointsSecondHalf == 0)
          return x + 50;
        return x + piece.pointsFirstHalf + piece.pointsSecondHalf;
      }, 0);

      this.players.push({
        id: i,
        name: `Jugador ${i + 1}`,
        pieces,
        hasSkipped: false,
        isWinner: false,
        points,
        color: colors[i],
      });
    }
  }

  getPlayers = () => this.players;

  getCurrentTurn = () => this.currentTurn;

  getInitialPiece = (): PieceInBoard => this.initialPiece;

  getWinners = (): Player[] | undefined => this.winners;

  private checkWinner = () => {
    if (
      this.players[this.currentTurn].pieces.find((x) => x != undefined) ==
      undefined
    ) {
      let winners: Player[] = [];
      this.players.forEach((x) => {
        if (x.points == 0) {
          winners.push(x);
          x.isWinner = true;
        }
        x.hasSkipped = false;
      });

      if (winners.length > 0) {
        this.winners = winners;
      }
      return;
    }
  };

  nextTurn = () => {
    if (this.winners != undefined) return;

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
      if (this.checkLeftPiece() || this.checkRightPiece()) {
        this.skipCount = 0;
        this.checkWinner();
        return;
      }
    } else {
      if (this.checkRightPiece() || this.checkLeftPiece()) {
        this.skipCount = 0;
        this.checkWinner();
        return;
      }
    }

    if (this.skipCount == 3) {
      // TODO
      this.winners = this.players.reduce(
        (winners, player) => {
          if (winners[0].points == player.points) {
            return [...winners, player];
          } else if (player.points < winners[0].points) {
            return [player];
          }
          return winners;
        },
        [this.players[0]],
      );
      this.players.forEach((x) => (x.hasSkipped = false));
    }

    this.skipCount += 1;
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
      if (piece.pointsFirstHalf == 0 && piece.pointsSecondHalf == 0) {
        this.players[this.currentTurn].points -= 50;
      } else {
        this.players[this.currentTurn].points -=
          piece.pointsFirstHalf + piece.pointsSecondHalf;
      }
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
      if (piece.pointsFirstHalf == 0 && piece.pointsSecondHalf == 0) {
        this.players[this.currentTurn].points -= 50;
      } else {
        this.players[this.currentTurn].points -=
          piece.pointsFirstHalf + piece.pointsSecondHalf;
      }
      return true;
    }
    return false;
  }
}
