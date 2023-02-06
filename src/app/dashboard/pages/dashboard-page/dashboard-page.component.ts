import { Component, OnInit } from "@angular/core";

import { ApiRequestService } from "../../../api-module";


@Component({
  selector: "dashboard-page",
  templateUrl: "dashboard-page.component.html",
  styleUrls: ["dashboard-page.component.scss"],
})
export class DashboardPage implements OnInit {

  constructor(private readonly apiRequestService: ApiRequestService) {
  }


  ngOnInit() {
    this.getCategories();
  }


  private getCategories() {
    this.apiRequestService.callOperation('get_categories').subscribe((data) => {
      console.log(data);
    })
  }

}
