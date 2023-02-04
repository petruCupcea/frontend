import { TooltipShowType } from '../types';

export interface TooltipParamsModel {

  popup?: boolean;
  content?: string;
  title?: string;
  html?: string;
  exclusive?: boolean;
  variation?: string;
  movePopup?: boolean;
  observeChanges?: boolean;
  position?: string;
  inline?: boolean;
  preserve?: boolean;
  on?: TooltipShowType;
  delay?: any;
  duration?: number;
  setFluidWidth?: boolean;
  hoverable?: boolean;
  closable?: boolean;
  addTouchEvents?: boolean;
  hideOnScroll?: any;
  className: any;

}
