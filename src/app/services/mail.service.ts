import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mail } from '../model/mail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private url:string = "http://localhost:8080";

  constructor(
    private http:HttpClient
  ) { }

  sendEmail(mail:Mail):Observable<any>{
    return this.http.post<any>(`${this.url}/mail/send`, mail);
  }

  saveMail(mail:Mail):Observable<any>{
    return this.http.post<any>(`${this.url}/mail/saved`, mail);
  }

  emailList(email:string):Observable<any>{
    return this.http.get<any>(`${this.url}/mail/list/${email}`);
  }

  deleteMailById(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/mail/delete/${id}`);
  }

  saveMailFile(mailId:number,uploadData:FormData):Observable<any>{
    return this.http.put<any>(`${this.url}/mail/mailfile/${mailId}`,uploadData);
  }

  getEmailFile(mailId:number):Observable<any>{
    return this.http.get<any>(`${this.url}/mail/file/${mailId}`);
  }

}
