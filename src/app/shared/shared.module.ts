import { ModuleWithProviders, NgModule } from '@angular/core';

import { AuthenticateService, AuthExpireTriggerService, SessionControlService, SessionTimerService } from './services';
import { AboutUsComponent, ProductCardComponent, SearchComponent } from './components';
import { NgForOf, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  declarations: [
    AboutUsComponent,
    ProductCardComponent,
    SearchComponent,
  ],
  exports: [
    AboutUsComponent,
    ProductCardComponent,
    SearchComponent,
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
