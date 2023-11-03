import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private _cardWidth: number = 0
  constructor() {}

  setCardWidth(width: number) {
    this._cardWidth = width
  }

  getCardWidth(): number {
    return this._cardWidth
  }
}
