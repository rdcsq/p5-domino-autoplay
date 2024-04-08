import { GameState } from "./state";

export class Simulation {
  private gameStates: GameState[];
  private timesPlayerWon: number[];
  private currentGame: number;

  constructor(private numberOfGames: number) {
    this.gameStates = [];
    this.timesPlayerWon = [0, 0, 0, 0];
    this.currentGame = 0;
    for (let i = 0; i < numberOfGames; i++) {
      this.gameStates.push(new GameState());
    }
  }

  getCurrentGameId = () => this.currentGame;

  getCurrentGame = () => this.gameStates[this.currentGame];

  getTimesPlayerWon = () => this.timesPlayerWon;

  private runGame = async (game: GameState) => {
    while (game.getWinner() == undefined) {
      console.log(`Game ${this.currentGame} turn`);
      game.nextTurn();
      await new Promise((r) => setTimeout(r, 50));
    }

    this.timesPlayerWon[game.getWinner()!.id] += 1;
    if (this.currentGame < this.gameStates.length - 1) {
      this.currentGame += 1;
    }
  };

  start = async () => {
    this.runGame(this.gameStates[this.currentGame]).then(async () => {
      await this.start();
    });
  };
}
