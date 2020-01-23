import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from 'src/app/services/medical.service';
import { Store } from 'src/app/model/store';

@Component({
  selector: 'app-medical-store',
  templateUrl: './medical-store.component.html',
  styleUrls: ['./medical-store.component.css']
})
export class MedicalStoreComponent implements OnInit {

  uploadData: FormData = new FormData();
  public selectedFile;
  imgURL:any;
  info = false;

  receivedImageData: any;
  base64Data: any;
  convertedImage:any;

  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private medService: MedicalService
    ) { }

  store: Store = new Store();

  ngOnInit() {
    this.medService.autoGetStore()
      .subscribe(data =>{
        this.store = data;
        this.setBackground();
      } , error => console.log(error));
  }

  toLogout(){
    this.service.logout();
    this.router.navigateByUrl('');
  }

  public onFileChange(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log("File changed");
  }

  onUpload(){
    if(this.selectedFile != null){
      this.uploadData.append('item image',this.selectedFile, this.selectedFile.name);
      console.log("Uploading Image");
      this.medService.uploadBackground(this.store.storeId, this.uploadData)
        .subscribe(data=>console.log("Image saved"), error => console.log(error)); 
      this.uploadData.delete('item image');
    } else {
      console.log("No image uploaded");
    }
  }

  onInfo(){
    if(this.info){
      this.info = false;
    } else {
      this.info = true;
    }
  }

  setBackground(){
    this.medService.downloadBackground(this.store.storeId)
    .subscribe(data => {
      if(data != null){
        this.receivedImageData = data.data;
        this.base64Data = this.receivedImageData;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      },
      error => console.log(error));
  }

}
