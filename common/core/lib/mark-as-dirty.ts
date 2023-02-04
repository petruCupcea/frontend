export const markAllFormControlsAsDirty = (formGroup: any) => {
  if (formGroup.controls) {
    const keys = Object.keys(formGroup.controls);
    keys.forEach((key: string) => {
      const control = formGroup.get(key);
      control.markAsDirty();
      control.markAsTouched();
      markAllFormControlsAsDirty(control);
    });
  }
};
