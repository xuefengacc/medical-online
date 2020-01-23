import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../_helpers/status.service';
import { JwtResponse } from '../model/jwt-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentUser: JwtResponse;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private service: AuthService,
    private status: StatusService
  ) { }

  ngOnInit() { }
  
  toHome(){
   // this.currentUser = this.status.ifLogin();
   // if(this.currentUser){
   //   this.login = true;
   // } else {
   //   this.login = false;
   // }
    this.router.navigateByUrl('');
  }

  toManagement(){
    this.currentUser = this.status.ifLogin();
    if(this.currentUser){
      if(this.currentUser.roles[0] == "ROLE_ADMIN"){
        this.router.navigateByUrl('admin');
      } else if (this.currentUser.roles[0] == "ROLE_MEDICAL"){
        this.router.navigateByUrl('medicine');
      } else if(this.currentUser.roles[0] == "ROLE_BLOOD"){
        this.router.navigateByUrl('blood');
      }
    this.currentUser = new JwtResponse();  
    } else {
      this.router.navigateByUrl('login');
    }
  }

  toEmail(){
    this.currentUser = this.status.ifLogin();
    if(this.currentUser){
      this.router.navigateByUrl('mail');
      this.currentUser = new JwtResponse();
    } else {
      this.router.navigateByUrl('login');
    }
  }

}
