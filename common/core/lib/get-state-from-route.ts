import { Router } from '@angular/router';


export const getStateFromRoute = (currentRouter: Router): {[key: string]: any} => {
  if (currentRouter.getCurrentNavigation() &&
    currentRouter.getCurrentNavigation().extras &&
    currentRouter.getCurrentNavigation().extras.state
  ) {
    return currentRouter.getCurrentNavigation().extras.state;
  } else {
    return {};
  }
};
