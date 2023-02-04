import { SystemSizeType, SystemThemeType } from '../types';


export interface AlertOptions {

  message: string;
  title?: string;
  theme?: SystemThemeType;
  size?: SystemSizeType;
  acceptLabel?: string;
  closable?: boolean;

}
