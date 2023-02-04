import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { BaseComponent } from 'common/core';

import { TooltipParamsModel } from './model/tooltip-params.model';


declare const $: any;


@Component({
  selector: 'tooltip-component',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  @Input() dataPosition: string;
  @ViewChild('contentRef') contentRef: ElementRef;
  @ViewChild('tooltipIcon') tooltipIcon: ElementRef;

  tooltip: any;
  private settings: TooltipParamsModel;


  constructor() {
    super();
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initTooltipView();
  }


  override ngOnDestroy() {
    super.ngOnDestroy();
    this.tooltip.popup('destroy');
  }


  private initTooltipView() {
    const contentView = this.contentRef.nativeElement.innerHTML;
    this.tooltip = $(this.tooltipIcon.nativeElement.children[0].firstChild);

    this.settings = {
      html: contentView,
      position: this.dataPosition,
      className: {
        popup: 'ui popup tooltip component',
      },
    };

    this.tooltip.popup(this.settings);
    this.removeContentViewFromTemplate();
  }


  private removeContentViewFromTemplate() {
    $(this.contentRef.nativeElement).remove();
  }

}
