import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthenticateService, AuthExpireTriggerService, SessionControlService, SessionTimerService } from './services';


@NgModule({
  declarations: [],
  imports: [],
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
