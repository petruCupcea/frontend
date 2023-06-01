import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthenticateService, AuthExpireTriggerService, SessionControlService, SessionTimerService } from './services';
import { ProductCardComponent } from './components';
import { NgIf } from '@angular/common';


@NgModule({
  imports: [
    NgIf
  ],
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent,
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthenticateService,
        AuthExpireTriggerService,
        SessionControlService,
        SessionTimerService,
      ],
    }
  }


  static forChild(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }

}
