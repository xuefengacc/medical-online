import { FormGroup } from '@angular/forms';

//customer validator to check that two fields are match
export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) =>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        //return null if controls haven't initialised yet
        if(!control || !matchingControl){
            return null;
        }

        //return null if another validator find error on the matching control
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            return null;
        }

        //set error on matchingControl if validation fails
        if(control.value !== matchingControl.value){
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}