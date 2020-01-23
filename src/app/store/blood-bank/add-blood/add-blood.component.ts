import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { MedicalService } from 'src/app/services/medical.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from 'src/app/model/store';

@Component({
  selector: 'app-add-blood',
  templateUrl: './add-blood.component.html',
  styleUrls: ['./add-blood.component.css']
})
export class AddBloodComponent implements OnInit {

  constructor(
    private service: MedicalService,
    //private authService: AuthService
  ) { }

  blood: Item = new Item();
  submitted = false;

  ngOnInit() {
  }
  
  newBlood(): void{
    this.submitted = false;
    this.blood = new Item();
  }

  //Remember: the store of this item will automatically 
  //set to curentUser in back-end, no need other opoeration in front-end
  save(){
    this.blood.itemId = null;
    this.blood.price = null;
    this.blood.producer = null;
    this.blood.catalog = null;
    this.blood.type = "BLOOD";
    this.service.createItem(this.blood)
      .subscribe(data => console.log(data), error => console.log(error));
    this.blood = new Item();
  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }

}
