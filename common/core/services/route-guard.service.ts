import * as _ from 'lodash';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';


@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.authService.hasRoutePermission(route.data ? route.data['routeKey'] : undefined)
      .pipe(
        map((isAllowedAccess: boolean) => {
          if (!isAllowedAccess) {
            const fallbackAllowed = _.find(this.authService.allowedRoutes, (routeKey) => {
              return this.authService.fallbackRoute === routeKey;
            });

            const fallbackRoute = this.findRouteByRouteKey(this.authService.fallbackRoute, fallbackAllowed);
            this.router.navigateByUrl(fallbackRoute ? fallbackRoute.path : 'forbidden');
          }

          return isAllowedAccess;
        }),
      );
  }


  private findRouteByRouteKey(routeKey: string, fallbackAllowed: string): Route {
    if (fallbackAllowed === undefined) {
      return undefined;
    }

    const expectedRoute = _.find(this.router.config, (obj) => {
      return (obj.data && obj.data.routeKey && (obj.data.routeKey === routeKey));
    });

    return expectedRoute;
  }

}
