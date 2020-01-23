import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { Store } from '../model/store';
import { MedicalService } from '../services/medical.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { noLeftSpaceValidator } from '../_helpers/validators/no-left-space.directive';
import { MedicineKey } from '../model/medicine-key';
import { AuthService } from '../auth/auth.service';
import { StatusService } from '../_helpers/status.service';
import { JwtResponse } from '../model/jwt-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  medicines: Observable<Item[]>;
  bloods: Observable<Item[]>;
  medicals: Observable<Store[]>;
  banks: Observable<Store[]>;
 
  keys: Observable<MedicineKey[]>

  //form: FormGroup;
  queryField: FormControl;
  query: string;
  currentUser: JwtResponse;
  submitted = false;
  logged = false;
  
  forMedicine = true;
  forStore = false;
  forBank = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MedicalService,
    private auth: AuthService,
    private status: StatusService
  ) {
    this.queryField = new FormControl('',[Validators.required,noLeftSpaceValidator()]);
   }

  ngOnInit() {

    this.queryField.valueChanges
      .pipe(
        //debouncing(delay) the input
        debounceTime(200), 
        //discard emission
        distinctUntilChanged(),
        switchMap(query => {
            this.query = query;
            return this.service.getMedicineKey(query);
          }))
      .subscribe(data => {
            this.keys = data;
            console.log(this.keys);
        }
      );

    this.currentUser = this.status.ifLogin();
    if(this.currentUser){
      console.log(this.currentUser);
      this.logged = true;
      this.currentUser = new JwtResponse();
    } else {
      this.logged = false;
    }
  }

  toLogin(){
    this.router.navigateByUrl('login');
  }

  toLogout(){
    this.auth.logout();
    this.logged = false;
  }

  onSubmit(){
    this.submitted = true;
    this.router.navigate(['search'], { queryParams: { query: this.query } });
    
  }

  toListStore(){
    this.router.navigate(['list', 'Med']);
  }

  toListBank(){
    this.router.navigate(['list','Blood']);
  }

}
