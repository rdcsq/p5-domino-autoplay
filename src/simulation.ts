import { GameState } from "./state";

export class Simulation {
  private gameStates: GameState[];
  private timesPlayerWon: number[];
  private currentGame: number;
  private hasFinished: boolean;

  constructor(numberOfGames: number) {
    this.gameStates = [];
    this.timesPlayerWon = [0, 0, 0, 0];
    this.currentGame = 0;
    this.hasFinished = false;
    for (let i = 0; i < numberOfGames; i++) {
      this.gameStates.push(new GameState());
    }
  }

  getCurrentGameId = () => this.currentGame;

  getCurrentGame = () => this.gameStates[this.currentGame];

  getTimesPlayerWon = () => this.timesPlayerWon;

  getHasFinished = () => this.hasFinished;

  private runGame = async (game: GameState) => {
    while (game.getWinner() == undefined) {
      console.log(`Game ${this.currentGame} turn`);
      game.nextTurn();
      await new Promise((r) => setTimeout(r, 16));
    }

    this.timesPlayerWon[game.getWinner()!.id] += 1;
    if (this.currentGame < this.gameStates.length - 1) {
      this.currentGame += 1;
    } else {
      this.hasFinished = true;
    }
  };

  start = async () => {
    this.runGame(this.gameStates[this.currentGame]).then(async () => {
      if (this.hasFinished) return;
      await this.start();
    });
  };
}
