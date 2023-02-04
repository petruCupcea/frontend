import { ValidatorFn } from '@angular/forms';

import { PromptType, SystemSizeType, SystemThemeType } from '../types';


export interface PromptOptions {

  promptType?: PromptType;
  promptOptions?: Array<{label: string; value: string | number}>;
  validators?: Array<ValidatorFn>;
  title?: string;
  defaultValue?: string;
  message?: string;
  messageAfter?: string;
  placeholder?: string;
  theme?: SystemThemeType;
  size?: SystemSizeType;
  acceptLabel?: string;
  refuseLabel?: string;
  closable?: boolean;
  loading?: boolean;

}
