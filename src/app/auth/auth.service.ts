import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtResponse } from '../model/jwt-response';
import { JwtRequest } from '../model/jwt-request';
import { map } from 'rxjs/operators';

//const httpOptions = {
//  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;

  private url = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON
      .parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): JwtResponse{
    return this.currentUserSubject.value;
  }

  login(jwtRequest: JwtRequest){
    return this.http.post<any>(this.url, jwtRequest)
      .pipe(map(jwtRes => {
        console.log(jwtRes);
        //store user details and jwt token in localstorage to keep user logged in during page refresh
        localStorage.setItem('currentUser', JSON.stringify(jwtRes));
        this.currentUserSubject.next(jwtRes);
        return jwtRes;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getVerifCode(email:string):Observable<any>{
    return this.http.post<any>(`${this.url}/reset`,email);
  }

  verifCode(email:string, code:string):Observable<any>{
    return this.http.post<any>(`${this.url}/check/${email}`, code);
  }

  autoPassword(email:string):Observable<any>{
    return this.http.post<any>(`${this.url}/send`,email);
  }
}
