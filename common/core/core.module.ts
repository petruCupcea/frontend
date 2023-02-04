import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AccountsFilterByBalancePipe,
  AmountPipe,
  AmountWithoutDecimalsPipe,
  CalculatePercentPipe,
  DateWrapperPipe,
  FilterByPipe,
  FormatIbanByTokenIndexPipe,
  MarkBoldStringPartPipe,
  RemoveWhiteSpacePipe,
  SafeSanitizerPipe,
  SearchByPipe,
  SecondsToMinutesPipe,
  TransformToCssBgPipe,
} from './pipes';
import {
  AuthService,
  CountdownTimerService,
  DataList,
  DownloadService,
  ExpiredPasswordService,
  RouteGuardService,
  ScrollTo,
  SelectableCollectionService,
  SessionService,
  SessionTimerService,
  UserAccountsService,
  UserDataService,
} from './services';
import { Environment } from './classes';


export const environmentFactory = () => {
  return new Environment({});
};


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AccountsFilterByBalancePipe,
    AmountPipe,
    AmountWithoutDecimalsPipe,
    CalculatePercentPipe,
    DateWrapperPipe,
    FilterByPipe,
    FormatIbanByTokenIndexPipe,
    MarkBoldStringPartPipe,
    RemoveWhiteSpacePipe,
    TransformToCssBgPipe,
    SafeSanitizerPipe,
    SearchByPipe,
    SecondsToMinutesPipe,
  ],
  exports: [
    AccountsFilterByBalancePipe,
    AmountPipe,
    AmountWithoutDecimalsPipe,
    DateWrapperPipe,
    FilterByPipe,
    FormatIbanByTokenIndexPipe,
    MarkBoldStringPartPipe,
    RemoveWhiteSpacePipe,
    TransformToCssBgPipe,
    SafeSanitizerPipe,
    CalculatePercentPipe,
    SearchByPipe,
    SecondsToMinutesPipe,
  ],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AccountsFilterByBalancePipe,
        AmountPipe,
        AmountWithoutDecimalsPipe,
        CalculatePercentPipe,
        DateWrapperPipe,
        FilterByPipe,
        FormatIbanByTokenIndexPipe,
        MarkBoldStringPartPipe,
        RemoveWhiteSpacePipe,
        TransformToCssBgPipe,
        AuthService,
        DataList,
        SelectableCollectionService,
        SessionService,
        SessionTimerService,
        ExpiredPasswordService,
        SafeSanitizerPipe,
        SecondsToMinutesPipe,
        ScrollTo,
        CountdownTimerService,
        DownloadService,
        RouteGuardService,
        UserAccountsService,
        UserDataService,
        {
          provide: Environment,
          useFactory: environmentFactory,
        },
      ],
    };
  }


  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }

}
