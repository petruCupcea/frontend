import { Observable } from 'rxjs';


export interface LoadingOptions {

  blocking: Observable<any>;
  title?: string;
  message?: string;

}
