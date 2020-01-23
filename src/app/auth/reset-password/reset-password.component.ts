import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from 'src/app/model/store';
import { MedicalService } from 'src/app/services/medical.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  inputEmail:string;
  verifCode:string;
  store:Store = new Store();
  request = false;

  constructor(
    private service:AuthService,
    private medical:MedicalService,
    private route:Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("check email");
    console.log(this.inputEmail);
    this.service.getVerifCode(this.inputEmail)
      .subscribe(data => console.log("Code sent"), 
       error => console.log(error));
    this.request = true;
  }

  onVerif(){
    this.service.verifCode(this.inputEmail, this.verifCode)
      .subscribe(data => {
        if(data != null){
          this.store = data;
          this.request = false;
          this.onUpdate();
        }}, error => console.log(error));
  }

  onUpdate(){
    this.service.autoPassword(this.inputEmail)
      .subscribe(data => this.route.navigateByUrl('login'),
      error => console.log(error));
  }

}
