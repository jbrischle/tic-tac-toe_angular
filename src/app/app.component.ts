import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

type player = 'circle' | 'x';
type cell = player | null;
type result = player | 'draw' | null
type game = { player: player, field: cell[], playWon: result };

@Component({
             selector:        'app-root',
             templateUrl:     './app.component.html',
             styleUrls:       ['./app.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush
           })
export class AppComponent implements OnInit {
  game: game = this.resetGame();

  constructor(private readonly swUpdate: SwUpdate) {
  }

  ngOnInit() {
    this.checkForVersionUpdates();
  }

  onClick(field: number) {
    if (this.game.playWon) {
      return;
    }

    if (this.game.field[field]) {
      return;
    }

    this.game.field[field] = this.game.player;
    this.game.player = this.nextPlayer(this.game.player);
    this.game.playWon = this.checkGameEndCondition();
  }

  onReset(): void {
    this.game = this.resetGame();
  }

  private nextPlayer(currentPlayer: player): player {
    return currentPlayer === 'circle' ? 'x' : 'circle';
  }

  private checkForVersionUpdates() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.subscribe((evt) => {
      if (evt.type === 'NO_NEW_VERSION_DETECTED') {
        return;
      }
      const updateApp = window.confirm(`
          Update available.
          Do you wish to install?
        `);
      if (updateApp) {
        window.location.reload();
      }
    });
  }

  private resetGame(): game {
    return {
      player: 'circle', field: [null, null, null, null, null, null, null, null, null], playWon: null
    };
  }

  private checkGameEndCondition(): result {
    if (this.hasPlayerWon('circle')) {
      return 'circle';
    }
    if (this.hasPlayerWon('x')) {
      return 'x';
    }
    if (this.game.field.filter(Boolean).length === 9) {
      return 'draw';
    }
    return null;
  }

  private hasPlayerWon(player: player) {
    return (this.game.field[0] === player &&
            this.game.field[3] === player &&
            this.game.field[6] === player)
           ||
           (this.game.field[1] === player &&
            this.game.field[4] === player &&
            this.game.field[7] === player)
           ||
           (this.game.field[2] === player &&
            this.game.field[5] === player &&
            this.game.field[8] === player)
           ||
           (this.game.field[0] === player &&
            this.game.field[1] === player &&
            this.game.field[2] === player)
           ||
           (this.game.field[3] === player &&
            this.game.field[4] === player &&
            this.game.field[5] === player)
           ||
           (this.game.field[6] === player &&
            this.game.field[7] === player &&
            this.game.field[8] === player)
           ||
           (this.game.field[0] === player &&
            this.game.field[4] === player &&
            this.game.field[8] === player)
           ||
           (this.game.field[2] === player &&
            this.game.field[4] === player &&
            this.game.field[6] === player);
  }
}
