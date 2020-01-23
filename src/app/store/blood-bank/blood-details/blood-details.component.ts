import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/model/item';
import { MedicalService } from 'src/app/services/medical.service';
import { BloodListComponent } from '../blood-list/blood-list.component';

@Component({
  selector: 'app-blood-details',
  templateUrl: './blood-details.component.html',
  styleUrls: ['./blood-details.component.css']
})
export class BloodDetailsComponent implements OnInit {

  @Input() blood: Item;
  constructor(
    private service: MedicalService,
    private listComponent: BloodListComponent
  ) { }

  hideDetails = true;

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.blood);
  }

  ifHideDetails(){
    if(this.hideDetails){
      this.hideDetails = false;
    } else {
      this.hideDetails = true;
    }
  }

  updateBlood(){
    this.service.updateItem(this.blood.itemId, this.blood)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error)
      );
  }

  deleteBlood(){
    this.service.deleteItem(this.blood.itemId)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error)
      );
  }

}
