import { Directive, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UpperCasePipe } from '@angular/common';

import { RemoveWhiteSpacePipe } from 'common/core';


@Directive({
  selector: '[ibanFormatter]',
})
export class IbanFormatterDirective implements OnInit, OnDestroy {

  private ngControlSubscription: Subscription;


  constructor(
    private readonly upperCasePipe: UpperCasePipe,
    private readonly removeWhiteSpacePipe: RemoveWhiteSpacePipe,
    private readonly ngControl?: NgControl,
  ) {
  }


  ngOnInit() {
    this.transformIban(this.ngControl.control.value);
    this.ngControlSubscription = this.ngControl.valueChanges.subscribe((value) => {
      this.transformIban(value);
    });
  }


  ngOnDestroy() {
    if (this.ngControlSubscription && this.ngControlSubscription.unsubscribe) {
      this.ngControlSubscription.unsubscribe();
    }
  }


  private transformIban(value) {
    let newValue = this.upperCasePipe.transform(value);
    newValue = this.removeWhiteSpacePipe.transform(newValue);
    this.ngControl.control.setValue(newValue, {emitEvent: false});
  }

}
