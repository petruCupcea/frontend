import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { BaseComponent } from 'common/core';

declare const qrcodegen: any;
declare const $: any;


@Component({
  selector: 'qr-token-img',
  template: '<div #svgContainer></div>',
})
export class QrImageComponent extends BaseComponent implements AfterViewInit {

  @Input() qr: string;
  @ViewChild('svgContainer') private readonly svgContainer: ElementRef;


  constructor() {
    super();
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    const QRC = qrcodegen.QrCode;
    const qr = QRC.encodeText(this.qr, QRC.Ecc.LOW);
    const svg = $(qr.toSvgString(4));
    $(this.svgContainer.nativeElement).append(svg);
  }

}
