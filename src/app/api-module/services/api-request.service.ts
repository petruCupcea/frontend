import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";


@Injectable()
export class ApiRequestService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }


  callOperation(operation: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/json_processor', {operation: operation});
  }


}
