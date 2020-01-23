import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/model/store';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  
  @Input() store: Store
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  toStorePage(){
    this.router.navigate(['store',this.store.email]);
  }

}
