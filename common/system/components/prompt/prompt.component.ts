import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from 'common/core';
import { ModalService, ModalWrapper } from 'common/modal';

import { Prompt } from '../../structures';
import { PromptService } from '../../services';


@Component({
  selector: 'prompt-modal',
  templateUrl: './prompt.component.html',
})
export class PromptComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('promptModal') modalRef: ElementRef;

  promptData: Prompt;
  promptFormGroup: FormGroup;
  loadingAction: boolean;
  private routeEventSubscription: Subscription;
  private modal: ModalWrapper;


  constructor(
    public router: Router,
    private readonly modalService: ModalService,
    private readonly promptService: PromptService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.loadingAction = false;

    this.promptFormGroup = formBuilder.group({
      result: ['', Validators.required],
    });
  }


  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initStackSubscription();
  }


  submit() {
    const options = this.promptData;
    const form = this.promptFormGroup;

    if (form.invalid || !options) {
      return;
    }

    const asyncOperation = options.callback(form.value.result);

    if (options.loading && asyncOperation) {
      this.loadingAction = true;
      asyncOperation
        .pipe(takeUntil(this.onDestroy))
        .subscribe({
          next: () => {
            this.loadingAction = false;
            this.dismiss();
          },
          error: () => {
            this.loadingAction = false;
          },
        });
    } else {
      this.dismiss();
    }
  }


  dismiss() {
    this.promptFormGroup.reset();
    if (this.modal) {
      this.modal.action('hide');
      this.modal.destroy();
      this.modal = undefined;
      this.routeEventSubscription.unsubscribe();
    }
  }


  private initStackSubscription() {
    this.promptService.onPromptAddToStack
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.promptData = this.promptService.current();
        if (!this.modal) {
          this.createModal();
        }
      });
  }


  private createModal() {
    const modalElement = this.modalRef.nativeElement;
    this.modal = this.modalService.create('confirm-modal', modalElement, this.clearPromptData());
    this.modal.setParams(Prompt.modalParams);
    this.promptService.currentPrompt = this.modal;
    this.initFormGroup();
    this.modal.action('show');

    this.routeEventSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.dismiss();
      }
    });
  }


  private initFormGroup() {
    if (this.promptFormGroup.get('result')) {
      this.promptFormGroup.removeControl('result');
    }
    const defaultValue = this.promptData.defaultValue;
    const validators = [Validators.required, ...this.promptData.validators];
    this.promptFormGroup.addControl('result', new FormControl(defaultValue, validators));
  }


  private clearPromptData(): () => void {
    return () => {
      this.promptService.clear();
      this.modal = undefined;
    };
  }

}
