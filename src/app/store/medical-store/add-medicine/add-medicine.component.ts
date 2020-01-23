import { Component, OnInit } from '@angular/core';
import { MedicalService } from 'src/app/services/medical.service';
import { Item } from 'src/app/model/item';
import { timeout } from 'rxjs/operators';
import { MedicineListComponent } from '../medicine-list/medicine-list.component';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  medicine: Item = new Item();
  savedMed: Item;
  submitted = false;
  uploadData: FormData = new FormData();

  public selectedFile:any;
  imgURL:any;

  constructor(
    private service: MedicalService
  ) { }

  ngOnInit() {
  }

  newMedicine(){
    this.medicine = new Item();
    this.submitted = false;
  }

  save(){
    this.medicine.itemId = null;
    this.medicine.bloodType = null;
    this.medicine.bloodVolum = 0;
    this.medicine.type = "MEDICINE";

    this.service.createItem(this.medicine)
      .subscribe(data => {
        this.savedMed = data;
        this.onUpload(this.savedMed.itemId);
      }, error => console.log(error));
  }

  public onFileChange(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log("File changed");
    //Display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (onEvent) => {
      this.imgURL = reader.result;
    };
  }

  //Uploading
  onUpload(itemId:number){
    if(this.selectedFile != null){
      this.uploadData.append('item image',this.selectedFile, this.selectedFile.name);
      console.log("Uploading Image");
      this.service.uploadImage(itemId, this.uploadData)
        .subscribe(data=>console.log("Image saved"), error => console.log(error)); 
      this.uploadData.delete('item image');
    } else {
      console.log("No image uploaded");
    }
  }

  onSubmit(){
    this.submitted = true;
    this.save();
    //this.onUpload();
    this.imgURL = null;
  }

}
