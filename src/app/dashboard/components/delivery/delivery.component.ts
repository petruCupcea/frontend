import { Component } from '@angular/core';


@Component({
  selector: 'delivery-categories',
  templateUrl: 'delivery.component.html',
  styleUrls: ['delivery.component.scss'],
})
export class DeliveryComponent {

  deliveryTitles: Array<{name: String; url: String}>


  constructor() {
    this.deliveryTitles = [
      {
        name: 'Sport',
        url: '../../../../assets/icons/sports.png',
      },
      {
        name: 'Produse pentru Odihnă',
        url: '../../../../assets/icons/hammock.png',
      },
      {
        name: 'Bucătărie',
        url: '../../../../assets/icons/kitchen.png',
      },
      {
        name: 'Utilaje Agricole',
        url: '../../../../assets/icons/sprout.png',
      },
      {
        name: 'Produse pentru Animale',
        url: '../../../../assets/icons/puppy.png',
      },
      {
        name: 'Jucării și divertisment',
        url: '../../../../assets/icons/joystick.png',
      },
      {
        name: 'Îmbrăcăminte',
        url: '../../../../assets/icons/clean-clothes.png',
      },
    ]
  }

}
