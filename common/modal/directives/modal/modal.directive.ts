import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { idGenerator } from 'common/core';

import { ModalService } from '../../services';
import { ModalWrapper } from '../../classes';


@Directive({
  selector: '[modal]',
})
export class ModalDirective implements OnInit {

  @Input('modal') modal: string;
  @Input() set modalShow(value: boolean) {
    if (!this.modalInstance) {
      this.init();
    }

    if (value) {
      this.modalInstance.action('show');
    } else {
      this.modalInstance.action('hide');
    }
  }

  private modalInstance: ModalWrapper;


  constructor(private readonly elementRef: ElementRef, private readonly modalService: ModalService) {
  }


  ngOnInit() {
    if (!this.modalInstance) {
      this.init();
    }
  }


  init() {
    const id = this.modal || idGenerator('mdl-');
    this.modalInstance = this.modalService.create(id, this.elementRef.nativeElement);
  }

}
