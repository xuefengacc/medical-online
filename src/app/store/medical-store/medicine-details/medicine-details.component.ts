import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/model/item';
import { MedicalService } from 'src/app/services/medical.service';
import { MedicineListComponent } from '../medicine-list/medicine-list.component';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {

  receivedImageData: any;
  base64Data: any;
  convertedImage:any;

  @Input() medicine: Item
  constructor(
    private service: MedicalService,
    private listComponent: MedicineListComponent
  ) { }

  hideDetails = true;

  ngOnInit() {
    this.getMedicineImage();
  }

  ngOnChanges(){
    //console.log(this.medicine);
  }

  ifHideDetails(){
    if(this.hideDetails){
      this.hideDetails = false;
    } else {
      this.hideDetails = true;
    }
  }

  getMedicineImage(){
    this.service.downloadImage(this.medicine.itemId)
      .subscribe(data => {
        if(data != null){
          this.receivedImageData = data.data;
          this.base64Data = this.receivedImageData;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        },
        error => console.log(error));
  }

  updateMedicine(){
    this.service.updateItem(this.medicine.itemId, this.medicine)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error)
      );
  }

  deleteMedicine(){
    this.service.deleteItem(this.medicine.itemId)
      .subscribe(
        data => {
          console.log("Data deletted");
          this.listComponent.reloadData();
        },
        error => console.log(error)
      );
  }
}
