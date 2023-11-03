import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: any

  @ViewChild('cardRef') cardRef:ElementRef | undefined

  constructor(private sliderService: SliderService){}

  ngAfterViewInit() {
    this.sliderService.setCardWidth(this.cardRef?.nativeElement.getBoundingClientRect().width)
  }
}
