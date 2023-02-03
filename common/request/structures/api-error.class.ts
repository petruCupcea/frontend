import { ApiErrorType } from '../types';


export class ApiError {

  constructor(
    public type: ApiErrorType,
    public error: any,
  ) {
  }

}
