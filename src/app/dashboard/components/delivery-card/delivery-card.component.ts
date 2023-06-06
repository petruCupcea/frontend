import { Component, Input } from '@angular/core';

@Component({
  selector: 'delivery-card',
  templateUrl: 'delivery-card.component.html',
  styleUrls: ['delivery-card.component.scss'],
})
export class DeliveryCardComponent {

  @Input() title: String;
  @Input() url: String;


  constructor() {
  }

}
