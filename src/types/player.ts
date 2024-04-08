export type Player = {
    name: string;
    pieces: (Piece | undefined)[];
    hasSkipped: boolean;
    isWinner: boolean;
}