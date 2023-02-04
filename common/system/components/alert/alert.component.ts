import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'common/core';
import { ModalService, ModalWrapper } from 'common/modal';

import { Alert } from '../../structures';
import { AlertService } from '../../services';


@Component({
  selector: 'alert-modal',
  templateUrl: './alert.component.html',
})
export class AlertComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('alertModal') modalRef: ElementRef;

  alertData: Alert;
  private routeEventSubscription: Subscription;
  private modal: ModalWrapper;


  constructor(
    public router: Router,
    public alertService: AlertService,
    private readonly modalService: ModalService,
  ) {
    super();
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.alertSubscribe();
  }


  release() {
    this.close();

    if (this.alertData && this.alertData.callback) {
      this.alertData.callback();
    }
  }


  close() {
    if (this.modal) {
      this.modal.action('hide');
      this.modal.destroy();
      this.modal = undefined;
      this.routeEventSubscription.unsubscribe();
    }
  }


  private alertSubscribe() {
    this.alertService.onAlertAddToStack
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.alertData = this.alertService.current();
        if (!this.modal) {
          this.createModal();
        }
      });
  }


  private createModal() {
    const modalElement = this.modalRef.nativeElement;
    this.modal = this.modalService.create('alert-modal', modalElement, () => {
      this.clearAlertData();
    });
    this.modal.setParams(Alert.modalParams);
    this.alertService.currentAlert = this.modal;
    this.modal.action('show');

    this.routeEventSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.close();
      }
    });
  }


  private clearAlertData() {
    this.alertService.clear();
    this.modal = undefined;
  }

}
