import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'common/core';
import { ModalService, ModalWrapper } from 'common/modal';

import { Loading } from '../../structures';
import { LoadingService } from '../../services';


@Component({
  selector: 'loading-modal',
  templateUrl: './loading.component.html',
})
export class LoadingComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  @ViewChild('loadingModal') modalRef: ElementRef;

  loadingData: Loading;
  private modal: ModalWrapper;


  constructor(readonly loadingService: LoadingService, private readonly modalService: ModalService) {
    super();
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initStackSubscription();
  }


  close() {
    if (this.modal) {
      this.modal.action('hide');
      this.modal.destroy();
      this.modal = undefined;
    }
  }


  override ngOnDestroy() {
    this.close();
    super.ngOnDestroy();
  }


  private initStackSubscription() {
    this.loadingService.onLoadingAddToStack
      .pipe(takeUntil(this.onDestroy))
      .subscribe((loadingModal: Loading) => {
        this.loadingData = this.loadingService.current();
        if (!this.modal) {
          this.createLoading();
        }

        const timestamp = new Date().getTime();
        loadingModal.blocking.pipe(
          finalize(() => {
            this.calcMinDisplayTime(timestamp);
          }),
          takeUntil(this.onDestroy),
        ).subscribe();
      });
  }


  private createLoading() {
    const modalElement = this.modalRef.nativeElement;
    this.modal = this.modalService.create('alert-modal', modalElement, this.clearLoadingData());
    this.modal.setParams(Loading.modalParams);
    this.loadingService.currentLoading = this.modal;
    this.modal.action('show');
  }


  private clearLoadingData(): () => void {
    return () => {
      this.loadingService.clear();
      this.modal = undefined;
    };
  }


  private calcMinDisplayTime(timestamp) {
    const newTimestamp = new Date().getTime();
    const differenceInMilliseconds = newTimestamp - timestamp;
    if (differenceInMilliseconds >= 1000) {
      this.close();
    } else {
      const millisecondsToOne = 1000 - differenceInMilliseconds;
      setTimeout(() => {
        this.close();
      }, millisecondsToOne);
    }
  }

}
