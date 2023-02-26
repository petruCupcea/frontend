import { Component } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';
import { AuthenticateService } from '../../../shared';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'login-page',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends BaseComponent {

  formGroup: UntypedFormGroup;
  errorMessage: string;


  constructor(
    private readonly router: Router,
    private readonly apiRequestService: ApiRequestService,
    private readonly authenticateService: AuthenticateService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  loginRequest() {
    this.authenticateService.login(this.formGroup.getRawValue())
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (value) => {
          if (value.status === 'success') {
            this.authenticateService.setLoggedIn(true);
            this.router.navigate(['dashboard']).then();
          } else if (value?.status === 'error') {
            this.errorMessage = value.payload.message;
          }
        },
      });
  }

}
