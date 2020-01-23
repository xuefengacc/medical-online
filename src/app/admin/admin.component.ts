import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
  }

  toLogout(){
    this.service.logout();
    this.router.navigateByUrl('');
  }

}
