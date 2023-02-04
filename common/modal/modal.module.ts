import { ModuleWithProviders, NgModule } from '@angular/core';

import { ModalDirective } from './directives';
import { ModalService } from './services';


@NgModule({
  imports: [
  ],
  declarations: [
    ModalDirective,
  ],
  exports: [],
})
export class ModalModule {

  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService,
      ],
    };
  }


  static forChild(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [],
    };
  }

}
