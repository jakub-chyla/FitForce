import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class FormValidator {

  public static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control as FormControl).value;

      if (!value) {
        return null;
      }

      const valid = /^\d{9}$/.test(value);
      return valid ? null : {exactNineDigits: true};
    };
  }
}
