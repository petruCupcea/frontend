import { Component } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'register-page',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent extends BaseComponent {

  formGroup: UntypedFormGroup;


  constructor(
    private readonly apiRequestService: ApiRequestService,
    formBuilder: FormBuilder,
  ) {
    super();
    this.formGroup = formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    })
  }


  registerNewUser() {
    if (this.formGroup.invalid) {
      return;
    }
    this.apiRequestService.callOperation('create_user', {...this.formGroup.getRawValue()})
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.getUsers();
      })
  }


  getUsers() {
    this.apiRequestService.callOperation('get_users')
      .pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        console.log(data.payload);
      })
  }

}
