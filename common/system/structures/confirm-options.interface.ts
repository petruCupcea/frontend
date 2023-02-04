import { SystemSizeType, SystemThemeType } from '../types';


export interface ConfirmOptions {

  message: string;
  title?: string;
  theme?: SystemThemeType;
  size?: SystemSizeType;
  acceptLabel?: string;
  refuseLabel?: string;
  closable?: boolean;
  loading?: boolean;

}
