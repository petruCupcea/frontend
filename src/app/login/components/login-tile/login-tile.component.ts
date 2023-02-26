import { Component, OnInit } from '@angular/core';

import { AuthenticateService, BaseComponent } from '../../../shared';
import { takeUntil } from 'rxjs';


@Component({
  selector: "login-tile",
  templateUrl: "login-tile.component.html",
  styleUrls: ["login-tile.component.scss"],
})
export class LoginTile extends BaseComponent implements OnInit {

  isLogged: boolean;


  constructor(
    private readonly authenticateService: AuthenticateService,
  ) {
    super();
  }


  ngOnInit() {
    this.authenticateService.getLoggedInValue()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: boolean) => {
        this.isLogged = value;
      })
  }

}
