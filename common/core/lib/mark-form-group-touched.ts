import { FormControl, FormGroup } from '@angular/forms';


export const markFormGroupTouched = (formGroup: FormGroup, skipEmptyFields?: boolean) => {
  if (formGroup.controls) {
    const keys = Object.keys(formGroup.controls);
    keys.forEach((key) => {
      const control = formGroup.get(key);

      if (skipEmptyFields ? control instanceof FormControl && control.value : control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        markFormGroupTouched(control);
      }
    });
  }
};
