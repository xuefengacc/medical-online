import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckStringService {

  constructor() { }

  isNotBlank(str:string):boolean{
    while(str.length != 0 && str.charAt(0) == " "){
      str.trim();
    }
    if(str.length != 0 && str != null){
      return true;
    } else {
      return false;
    }
  }

}
