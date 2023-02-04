import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CoreModule } from 'common/core';


import {
  AccordionDirective,
  CheckboxLabelBinderDirective,
  DropdownDirective,
  HighlightDigitsDirective,
  IbanFormatterDirective,
  IndeterminateDirective,
  LabelForDirective,
  OutsideClickDirective,
  PreventAutofillDirective,
  ScrollToFixedDirective,
} from './directives';
import {
  LoaderBlockComponent,
  QrImageComponent,
  SelectableComponent,
  TooltipComponent,
} from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forChild(),
  ],
  declarations: [
    AccordionDirective,
    CheckboxLabelBinderDirective,
    DropdownDirective,
    HighlightDigitsDirective,
    IbanFormatterDirective,
    IndeterminateDirective,
    LabelForDirective,
    QrImageComponent,
    OutsideClickDirective,
    PreventAutofillDirective,
    ScrollToFixedDirective,
    LoaderBlockComponent,
    SelectableComponent,
    TooltipComponent,
  ],
  exports: [
    AccordionDirective,
    CheckboxLabelBinderDirective,
    DropdownDirective,
    HighlightDigitsDirective,
    IbanFormatterDirective,
    IndeterminateDirective,
    LabelForDirective,
    QrImageComponent,
    OutsideClickDirective,
    PreventAutofillDirective,
    ScrollToFixedDirective,
    LoaderBlockComponent,
    SelectableComponent,
    TooltipComponent,
  ],
})
export class SharedComponentsModule {
}
