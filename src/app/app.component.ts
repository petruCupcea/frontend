import { Component, OnInit } from '@angular/core';

import { AuthenticateService, BaseComponent } from './shared';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {

  userLogged: boolean;


  constructor(
    private readonly authenticateService: AuthenticateService,
  ) {
    super();
  }


  ngOnInit() {
    this.authenticateService.getLoggedInValue()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (value: boolean) => {
          this.userLogged = value;
        }
      });
  }

}
