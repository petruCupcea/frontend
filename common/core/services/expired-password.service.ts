import { Injectable } from '@angular/core';


@Injectable()
export class ExpiredPasswordService {

  loginRoutesList: Array<string>;


  setRoutesList(loginRoutesList: Array<string>) {
    this.loginRoutesList = loginRoutesList;
  }


  getRoutesList() {
    return this.loginRoutesList;
  }

}
