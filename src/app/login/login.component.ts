import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { JwtRequest } from '../model/jwt-request';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_helpers/alert.service';
import { JwtResponse } from '../model/jwt-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private jwtRequest: JwtRequest;
  private jwtResponse: JwtResponse;
  submitted = false;
  loading = false;
  //returnUrl = 'admin';

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
    ) {
    this.jwtRequest = new JwtRequest();
    this.jwtResponse = new JwtResponse();
    // redirect to home if already logged in
    //if (this.service.currentUserValue) {
    //    this.router.navigate(['/']);
    //}
   }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  backToHome(){
    this.router.navigateByUrl('');
  }

  onSubmit() {

    this.submitted = true;
    this.service.logout();
    //reset alert on submit
    this.alert.clear();

    //TODO Stop here if form invalid
 
    this.loading = true;
    this.service.login(this.jwtRequest)
      .subscribe(
        data => {
          this.jwtResponse = data;
          if(this.jwtResponse.roles[0] == "ROLE_ADMIN"){
            this.router.navigateByUrl('admin');
          } else if (this.jwtResponse.roles[0] == "ROLE_MEDICAL"){
            this.router.navigateByUrl('medicine');
          } else if(this.jwtResponse.roles[0] == "ROLE_BLOOD"){
            this.router.navigateByUrl('blood');
          }
        },
        error => {
          console.log(error);
          this.alert.error(error);
          this.loading = false;
        }
      );
  }

  toReset(){
    this.router.navigateByUrl('reset');
  }

}
