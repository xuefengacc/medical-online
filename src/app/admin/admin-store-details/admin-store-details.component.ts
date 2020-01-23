import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '../../model/store';
import { MedicalService } from '../../services/medical.service';
import { AdminStoreListComponent } from '../admin-store-list/admin-store-list.component';

@Component({
  selector: 'app-admin-store-details',
  templateUrl: './admin-store-details.component.html',
  styleUrls: ['./admin-store-details.component.css']
})
export class AdminStoreDetailsComponent implements OnInit, OnChanges {

  @Input() store: Store;
  constructor(private service: MedicalService, 
    private listComponent: AdminStoreListComponent) { }

  storeView: Store = new Store();
  hideDetails = true;
  
  ngOnInit() { 
    //TODO There must be some better way
    this.storeView.storeName = this.store.storeName;
    this.storeView.email = this.store.email;
    this.storeView.type = this.store.type;
    this.storeView.address = this.store.address;
    this.storeView.phone = this.store.phone; 
  }

  ngOnChanges() {
    console.log(this.store);
  }

  ifHideDetails(){
      if(!this.hideDetails){
        this.hideDetails = true;
      } else {
        this.hideDetails = false;
      }
  }

  updateStore(){

    this.service.updateStore(this.store.storeId, this.store)
      .subscribe(
        data => {
          console.log(data);
          this.store = data as Store;
          this.listComponent.reloadData();
        },
          error => console.log(error));
    //this.listComponent.reloadData(); TODO why not working
  }

  deleteStore(){
    this.service.deleteStore(this.store.storeId)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }


}
