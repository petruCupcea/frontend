import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { ApiRequestService } from '../../../api-module';
import { BaseComponent } from '../../../shared';


@Component({
  selector: 'register-page',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {

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
    });
  }


  ngOnInit() {
  }


  registerNewUser() {
    if (this.formGroup.invalid) {
      return;
    }
    this.apiRequestService.callOperation('create_user', {...this.formGroup.getRawValue()})
      .pipe(takeUntil(this.onDestroy))
      .subscribe();
  }

}
