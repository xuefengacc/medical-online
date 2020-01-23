import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Mail } from '../model/mail';
import { MedicalService } from '../services/medical.service';
import { Store } from '../model/store';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  store: Store = new Store();
  mail: Mail = new Mail();
  address: string;
  uploadData: FormData = new FormData();
  public selectFile:any;
  fileURL: any;
  mailList: Array<Mail>;

  receiveData: any;
  base64Data:any;

  receivedImageData:any;
  imageBase64Data:any;
  convertedImage:any;

  saved = false;
  toSent = false;
  mailSent = false;
  details = false;

  constructor(
    private service: MailService,
    private medService: MedicalService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.medService.autoGetStore()
      .subscribe(data => {
        this.store = data;
        this.setBackGround();
      },error => console.log(error));
    this.reload();
   }

  save(){
    this.mail.mailFrom = this.store.email;
    this.service.saveMail(this.mail)
      .subscribe(data => {
        if(data!=null){
          this.mail = data;
          this.onUpload(this.mail.mailId);
          this.saved = true;
        }
      });
  }

  onUpload(mailId:number){
    if(this.selectFile!=null){
      this.uploadData.append('item image', this.selectFile, this.selectFile.name);
      this.service.saveMailFile(mailId, this.uploadData)
        .subscribe(data => {
          this.mail=data;
          console.log("Saved");
        },
          error => console.log(error));
      this.uploadData.delete('item image');
    }
  }

  onFileChange(event){
    this.selectFile = event.target.files[0];
  }

  onCreate() {
    this.toSent = true;
   }

  cancle() { 
    this.toSent = false;
    this.saved = false;
    this.mail = new Mail();
  }

  onSend() {
    this.mail.sendDateTime = Date.now().toLocaleString(); 
    this.service.sendEmail(this.mail)
      .subscribe(data => {
        this.saved = false;
        this.mailSent = true;
        this.mail = new Mail();
      }, error => console.log(error));
  }

  reload(){
    this.service.emailList(this.store.email)
      .subscribe(data => {
        if(data!=null){
          this.mailList = data;
        }
      }, error => console.log(error));
  }

  onBack(){
    this.mailSent = false;
    this.router.navigateByUrl('mail');
  }

  showDetails(){
    if(this.details){
      this.details = false;
    } else {
      this.details = true;
    }
  }

  setBackGround(){
    this.medService.downloadBackground(this.store.storeId)
      .subscribe(data =>{
        if(data!=null){
          this.receivedImageData = data.data;
          this.imageBase64Data = this.receivedImageData;
          this.convertedImage = 'data:image/jpeg;base64,' + this.imageBase64Data;
        }
      },error => console.log(error));
  }

  toLogout(){
    this.auth.logout();
    this.router.navigateByUrl('');
  }
}
