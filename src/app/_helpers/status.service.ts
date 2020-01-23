import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtResponse } from '../model/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private currentUserSubject: BehaviorSubject<JwtResponse>;

  constructor() { }

  ifLogin():JwtResponse{
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON
      .parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }  
}
