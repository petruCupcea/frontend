import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const nextEvent: HttpRequest<any> = req.clone({
      withCredentials: true,
    });

    return next.handle(nextEvent).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if needed...
        }

        return event;
      }),
    );
  }

}
