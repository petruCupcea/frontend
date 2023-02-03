export class ApiResponse {

  constructor(
    public status: 'success' | 'error',
    public payload: any,
  ) {
  }

}
