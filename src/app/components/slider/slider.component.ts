import {
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  _start = signal<number>(0);
  _x = signal<number>(0);
  _diff = signal<number>(0);
  _touchStartPos = signal<number>(0);
  id: number = 0;
  slideWith: number = 0;
  offsetToSlide: number = 0;
  cards = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
  ];

  constructor(private sliderService: SliderService) {}

  @ViewChild('slider') slider: ElementRef | undefined;

  ngAfterViewInit(): void {
    const x = this.slider?.nativeElement.getBoundingClientRect().x;
    this._x.set(x);
    this.slideWith = this.sliderService.getCardWidth();
    this.offsetToSlide = this.slideWith / 10;
  }

  @HostListener('touchstart', ['$event'])
  start(e: any) {
    const touchStartPos = this.slider?.nativeElement.getBoundingClientRect().x;
    this._touchStartPos.set(touchStartPos);
    this._start.set(e.touches[0].clientX - this._diff());
  }

  @HostListener('touchmove', ['$event'])
  move(e: any) {
    const diff = this._start() - e.touches[0].clientX;
    if (this.id === 0 && diff < 0) {
      return;
    }

    if (
      Math.abs(this.id) === this.cards.length - 1 &&
      diff > (this.cards.length - 1) * this.slideWith + (this.cards.length - 1) * 80
    ) {
      return;
    }

    this._diff.set(-diff);
  }

  @HostListener('touchend', ['$event'])
  end(e: any) {
    const touchEndPos = this.slider?.nativeElement.getBoundingClientRect().x;
    const diff = this._touchStartPos() - touchEndPos;
    if (Math.abs(diff) > this.offsetToSlide) {
      if (diff > 0) {
        this.id -= 1;
      }
      if (diff < 0) {
        this.id += 1;
      }
    }
    const width = this.slideWith * this.id + this.id * 80;
    this._diff.set(width);
  }
}
