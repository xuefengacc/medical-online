import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/model/item';
import { MedicalService } from 'src/app/services/medical.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  receivedImageData:any;
  based64Data:any;
  convertedImage:any;

  @Input() med:Item
  constructor(
    private service:MedicalService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getMedicineImage();
  }

  getMedicineImage(){
    this.service.downloadImage(this.med.itemId)
      .subscribe(data => {
        if(data != null){
          this.receivedImageData = data.data;
          this.based64Data = this.receivedImageData;
          this.convertedImage = 'data:image/jpeg;base64,' + this.based64Data;
        }},error => console.log(error));
  }

  toStore(){
    this.router.navigate(['store',this.med.storeEmail]);
  }
}
