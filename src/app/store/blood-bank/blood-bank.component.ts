import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from 'src/app/services/medical.service';
import { Store } from 'src/app/model/store';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {

  constructor(
    private service: AuthService,
    private medService: MedicalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  store: Store = new Store();

  ngOnInit() {
    this.medService.autoGetStore()
      .subscribe(data => this.store = data, error => console.log(error));
  }

  toLogout(){
    this.service.logout();
    this.router.navigateByUrl('');
  }

}
