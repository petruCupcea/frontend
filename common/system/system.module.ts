import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CoreModule } from 'common/core';
import { SharedComponentsModule } from 'common/shared';

import {
  AlertComponent,
  ConfirmComponent,
  LoadingComponent,
  PromptComponent,
  SystemAlertComponent,
} from './components';
import {
  AlertService,
  ConfirmService,
  LoadingService,
  PromptService,
  SystemService,
} from './services';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule.forChild(),
    SharedComponentsModule,
  ],
  declarations: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    SystemAlertComponent,
    LoadingComponent,
  ],
  exports: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    SystemAlertComponent,
    LoadingComponent,
  ],
  providers: [
    AlertService,
    ConfirmService,
    PromptService,
    SystemService,
    LoadingService,
  ],
})
export class SystemModule {
}
