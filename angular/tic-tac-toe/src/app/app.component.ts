import { Component } from '@angular/core';

@Component({
             selector:    'app-root',
             templateUrl: './app.component.html',
             styleUrls:   ['./app.component.scss']
           })
export class AppComponent {
  player: icon = 'circle';
  field: cell[] = [null, null, null, null, null, null, null, null, null];
  playWon: result = null;

  onClick(field: number) {
    if (this.playWon) {
      return;
    }

    if (this.field[field]) {
      return;
    }

    this.field[field] = this.player;

    if (this.player === 'circle') {
      this.player = 'x';
    } else {
      this.player = 'circle';
    }

    this.checkGameEndCondition();
  }

  onReset(): void {
    window.location.reload();
  }

  private checkGameEndCondition() {
    if ((this.field[0] === 'circle' &&
         this.field[3] === 'circle' &&
         this.field[6] === 'circle')
        ||
        (this.field[1] === 'circle' &&
         this.field[4] === 'circle' &&
         this.field[7] === 'circle')
        ||
        (this.field[2] === 'circle' &&
         this.field[5] === 'circle' &&
         this.field[8] === 'circle')
        ||
        (this.field[0] === 'circle' &&
         this.field[1] === 'circle' &&
         this.field[2] === 'circle')
        ||
        (this.field[3] === 'circle' &&
         this.field[4] === 'circle' &&
         this.field[5] === 'circle')
        ||
        (this.field[6] === 'circle' &&
         this.field[7] === 'circle' &&
         this.field[8] === 'circle')
        ||
        (this.field[0] === 'circle' &&
         this.field[4] === 'circle' &&
         this.field[8] === 'circle')
        ||
        (this.field[2] === 'circle' &&
         this.field[4] === 'circle' &&
         this.field[6] === 'circle')) {
      this.playWon = 'circle';
      return;
    }
    if ((this.field[0] === 'x' &&
         this.field[3] === 'x' &&
         this.field[6] === 'x')
        ||
        (this.field[1] === 'x' &&
         this.field[4] === 'x' &&
         this.field[7] === 'x')
        ||
        (this.field[2] === 'x' &&
         this.field[5] === 'x' &&
         this.field[8] === 'x')
        ||
        (this.field[0] === 'x' &&
         this.field[1] === 'x' &&
         this.field[2] === 'x')
        ||
        (this.field[3] === 'x' &&
         this.field[4] === 'x' &&
         this.field[5] === 'x')
        ||
        (this.field[6] === 'x' &&
         this.field[7] === 'x' &&
         this.field[8] === 'x')
        ||
        (this.field[0] === 'x' &&
         this.field[4] === 'x' &&
         this.field[8] === 'x')
        ||
        (this.field[2] === 'x' &&
         this.field[4] === 'x' &&
         this.field[6] === 'x')) {
      this.playWon = 'x';
      return;
    }

    if (this.field.filter(Boolean).length === 9) {
      this.playWon = 'draw';
    }
  }
}

type icon = 'circle' | 'x';
type cell = icon | null;
type result = icon | 'draw' | null
