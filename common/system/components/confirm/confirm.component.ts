import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'common/core';
import { ModalService, ModalWrapper } from 'common/modal';

import { Confirm } from '../../structures';
import { ConfirmService } from '../../services';


@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('confirmModal') modalRef: ElementRef;

  confirmData: Confirm;
  loadingAction: boolean;
  private routeEventSubscription: Subscription;
  private modal: ModalWrapper;


  constructor(
    public router: Router,
    private readonly modalService: ModalService,
    private readonly confirmService: ConfirmService,
  ) {
    super();
    this.loadingAction = false;
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.modalSubscribe();
  }


  release(actionConfirmed: boolean) {
    const options = this.confirmData;
    if (!options) {
      return;
    }

    const asyncOperation = options.callback(actionConfirmed);

    if (options.loading && asyncOperation) {
      this.loadingAction = true;
      asyncOperation
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.loadingAction = false;
          this.clearOnEnd();
        }, () => {
          this.loadingAction = false;
        });
    } else {
      this.clearOnEnd();
    }
  }


  private modalSubscribe() {
    this.confirmService.onConfirmAddToStack
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.confirmData = this.confirmService.current();
        if (!this.modal) {
          this.createModal();
        }
      });
  }


  private createModal() {
    const modalElement = this.modalRef.nativeElement;
    this.modal = this.modalService.create('confirm-modal', modalElement, () => {
      this.clearAlertData();
    });
    this.modal.setParams(Confirm.modalParams);
    this.confirmService.currentModal = this.modal;
    this.modal.action('show');

    this.routeEventSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.clearOnEnd();
      }
    });
  }


  private clearOnEnd() {
    if (this.modal) {
      this.modal.action('hide');
      this.modal.destroy();
      this.modal = undefined;
      this.routeEventSubscription.unsubscribe();
    }
  }


  private clearAlertData() {
    this.confirmService.clear();
    this.modal = undefined;
  }

}
