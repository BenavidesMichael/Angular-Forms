import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;
  }

  static matchPasswords(control: AbstractControl) {
    // dans le control ici on va lui envoyer tout le forms.
    // car il se trouve dans les validation de groupe.
    const password = control?.get('password')?.value;
    const confirmPassword = control?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }
}

// a faire regex
function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}
