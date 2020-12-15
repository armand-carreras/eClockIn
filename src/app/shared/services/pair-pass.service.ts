import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PairPassService {

  constructor() { }
  public static passMatch(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get('password');
      const repassControl = formGroup.get('repassword');
      if(!passwordControl || !repassControl){
        return null;
      }
      const passwordValue = passwordControl.value;
      if(!passwordValue){
        return null;
      }
      const repassValue = repassControl.value;
      if(passwordValue != repassValue){
        return { dontMatch: true}; //our error
      }
      return null;
    };
  }
}

