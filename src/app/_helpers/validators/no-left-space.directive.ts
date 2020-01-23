import { ValidatorFn, AbstractControl } from '@angular/forms';

export function noLeftSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const query = control.value;
    if(query.startsWith(" ")){
      return {"noLeftSpace": true};
    }
    return null;
  };
}