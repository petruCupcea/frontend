import { Component } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiRequestService } from '../../../api-module';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../shared';

@Component({
  selector: 'login-page',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends BaseComponent {

  formGroup: UntypedFormGroup;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  loginRequest() {
    this.apiRequestService.callOperation('login_user', this.formGroup.getRawValue())
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value) => {
        console.log(value);
      });
  }

}
