import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';

import { DateHelper } from './date-helper.class';
import { REG_EXP } from '../types';


export class CustomValidators {

  static swiftXCharacterSet = Validators.pattern(REG_EXP.SWIFT_X_CHARACTER_SET);


  static digitsOnly = Validators.pattern(REG_EXP.DIGITS_ONLY);


  static minDate(minimalDate: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | undefined => {
      const date = DateHelper.isoStringToDate(control.value);
      const min = DateHelper.isoStringToDate(minimalDate);

      return (date < min) ? {minDate: true} : undefined;
    };
  }


  static maxDate(maximalDate: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | undefined => {
      const date = DateHelper.isoStringToDate(control.value);
      const max = DateHelper.isoStringToDate(maximalDate);

      return (date > max) ? {maxDate: true} : undefined;
    };
  }


  static maxAmount(maximalAmount = 999999999.99): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | undefined => {
      if (control.value) {
        const removedWhitespaces = control.value.toString().replace(/\s+/g, '');
        const castedAmount = parseFloat(removedWhitespaces);

        return (castedAmount > maximalAmount) ? {amount: true} : undefined;
      } else {
        return undefined;
      }
    };
  }


  static amountPattern(allowedDecimals?: number): ValidatorFn {
    allowedDecimals = (allowedDecimals || 2);
    const regex = new RegExp(`^[\\d ]+(.[\\d]{1,${allowedDecimals}})?$`);

    return Validators.pattern(regex);
  }


  static noWhitespaceValidator(control: FormControl) {
    if (!control.value || control.value === '') {
      return undefined;
    }
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;

    return isValid ? undefined : {whitespace: true};
  }


  static sortedPassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | undefined => {
      const reversedString = control.value.split('').reverse().join('');
      const isOrdered = this.orderedPassword(control.value) || this.orderedPassword(reversedString);
      if (isOrdered) {
        return {
          stringIsOrdered: true,
        };
      }

      return undefined;
    };
  }


  static identicalCharacters(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | undefined => {
      if (this.checkIdenticalCharacters(control.value)) {
        return {
          hasIdenticalCharacters: true,
        };
      }

      return undefined;
    };
  }


  static requiredIfEmpty(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value && !otherControl.value) {
        return {requiredByOtherField: true};
      }
      if (control.value && !otherControl.value) {
        otherControl.updateValueAndValidity();
      }

      return undefined;
    };
  }


  private static checkIdenticalCharacters(password: string): boolean {
    let isIdentical = false;
    for (let i = 1; i < password.length; i++) {
      isIdentical = (Number(password[i]) === Number(password[i - 1]));
      if (!isIdentical) {
        break;
      }
    }

    return isIdentical;
  }


  private static orderedPassword(password: string): boolean {
    let isAscending = false;
    for (let i = 1; i < password.length; i++) {
      isAscending = (Number(password[i]) - 1 === Number(password[i - 1]));
      if (!isAscending) {
        break;
      }
    }

    return isAscending;
  }

}
