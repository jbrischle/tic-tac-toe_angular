import { ChangeDetectionStrategy, Component } from '@angular/core';

type icon = 'circle' | 'x';
type cell = icon | null;
type result = icon | 'draw' | null
type game = { player: icon, field: cell[], playWon: result };

@Component({
             selector:        'app-root',
             templateUrl:     './app.component.html',
             styleUrls:       ['./app.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush
           })
export class AppComponent {
  game: game = this.resetGame();

  onClick(field: number) {
    if (this.game.playWon) {
      return;
    }

    if (this.game.field[field]) {
      return;
    }

    this.game.field[field] = this.game.player;
    this.game.player = this.game.player === 'circle' ? 'x' : 'circle';
    this.checkGameEndCondition();
  }

  onReset(): void {
    this.game = this.resetGame();
  }

  private resetGame(): game {
    const DEFAULT_GAME = {
      player: 'circle', field: [null, null, null, null, null, null, null, null, null], playWon: null
    };
    return JSON.parse(JSON.stringify(DEFAULT_GAME));
  }

  private checkGameEndCondition(): void {
    if ((this.game.field[0] === 'circle' &&
         this.game.field[3] === 'circle' &&
         this.game.field[6] === 'circle')
        ||
        (this.game.field[1] === 'circle' &&
         this.game.field[4] === 'circle' &&
         this.game.field[7] === 'circle')
        ||
        (this.game.field[2] === 'circle' &&
         this.game.field[5] === 'circle' &&
         this.game.field[8] === 'circle')
        ||
        (this.game.field[0] === 'circle' &&
         this.game.field[1] === 'circle' &&
         this.game.field[2] === 'circle')
        ||
        (this.game.field[3] === 'circle' &&
         this.game.field[4] === 'circle' &&
         this.game.field[5] === 'circle')
        ||
        (this.game.field[6] === 'circle' &&
         this.game.field[7] === 'circle' &&
         this.game.field[8] === 'circle')
        ||
        (this.game.field[0] === 'circle' &&
         this.game.field[4] === 'circle' &&
         this.game.field[8] === 'circle')
        ||
        (this.game.field[2] === 'circle' &&
         this.game.field[4] === 'circle' &&
         this.game.field[6] === 'circle')) {
      this.game.playWon = 'circle';
      return;
    }
    if ((this.game.field[0] === 'x' &&
         this.game.field[3] === 'x' &&
         this.game.field[6] === 'x')
        ||
        (this.game.field[1] === 'x' &&
         this.game.field[4] === 'x' &&
         this.game.field[7] === 'x')
        ||
        (this.game.field[2] === 'x' &&
         this.game.field[5] === 'x' &&
         this.game.field[8] === 'x')
        ||
        (this.game.field[0] === 'x' &&
         this.game.field[1] === 'x' &&
         this.game.field[2] === 'x')
        ||
        (this.game.field[3] === 'x' &&
         this.game.field[4] === 'x' &&
         this.game.field[5] === 'x')
        ||
        (this.game.field[6] === 'x' &&
         this.game.field[7] === 'x' &&
         this.game.field[8] === 'x')
        ||
        (this.game.field[0] === 'x' &&
         this.game.field[4] === 'x' &&
         this.game.field[8] === 'x')
        ||
        (this.game.field[2] === 'x' &&
         this.game.field[4] === 'x' &&
         this.game.field[6] === 'x')) {
      this.game.playWon = 'x';
      return;
    }

    if (this.game.field.filter(Boolean).length === 9) {
      this.game.playWon = 'draw';
    }
  }
}
