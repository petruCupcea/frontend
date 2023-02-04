import { Component, OnInit } from "@angular/core";

import { ApiClientService } from "common/request";


@Component({
  selector: "dashboard-page",
  templateUrl: "dashboard-page.component.html",
  styleUrls: ["dashboard-page.component.scss"],
})
export class DashboardPage implements OnInit {

  constructor(private readonly apiClientService: ApiClientService) {
  }


  ngOnInit() {
    this.getCategories();
  }


  private getCategories() {
    this.apiClientService.call('get_categories').subscribe((data) => {
      console.log(data);
    })
  }

}
