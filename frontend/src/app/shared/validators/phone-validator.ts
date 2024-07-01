import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const nameRegex = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)*$/;
    const valid = nameRegex.test(control.value);
    return valid ? null : { 'invalidName': { value: control.value } };
  };
}
