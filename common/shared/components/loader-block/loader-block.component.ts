import { Component, Input, OnInit } from '@angular/core';

import { BaseComponent } from 'common/core';


@Component({
  selector: 'loader-block',
  templateUrl: './loader-block.component.html',
})
export class LoaderBlockComponent extends BaseComponent implements OnInit {

  @Input() size?: string;
  @Input() inline?: boolean;
  @Input() dimmer?: boolean;
  @Input() inverted?: boolean;
  @Input() useMaterial?: boolean;


  constructor() {
    super();
  }


  ngOnInit() {
  }

}
