import { Component, OnInit } from '@angular/core';
import { Store } from '../../model/store';
import { MedicalService } from '../../services/medical.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-create-store',
  templateUrl: './admin-create-store.component.html',
  styleUrls: ['./admin-create-store.component.css']
})
export class AdminCreateStoreComponent implements OnInit {

  //storeForm: FormGroup;
  store: Store = new Store();
  submitted = false;

  constructor(private service: MedicalService) { }

  ngOnInit() {  }

  newStore(): void{
    this.submitted = false;
    this.store = new Store();
  }

  save(){
    this.store.storeId = null;
    this.store.items = null;
    this.store.roles = null;
    this.service.saveStoreUser(this.store)
      .subscribe(data => console.log(data), error => console.log(error));
    this.store = new Store();
  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }
}
