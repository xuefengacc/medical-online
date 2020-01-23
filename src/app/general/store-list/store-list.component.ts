import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalService } from 'src/app/services/medical.service';
import { Store } from 'src/app/model/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AgmMap } from '@agm/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  type:string;//Med; Blood
  storeList: Array<Store>;//can be medical store or blood bank

  currentPage = 1;
  itemsPerPage = 10;
  pageSize:number;
  total:number;

  latitude:number;
  longitude:number;

  desLat:number;
  desLon:number;
  
  sortedList:Array<Store>;

  constructor(
    private service:MedicalService,
    private route:ActivatedRoute,
    private location: LocationService
  ) { }

  ngOnInit() {
    
    this.setCurrentLocation();
    this.type = this.route.snapshot.paramMap.get('type');
    if(this.type == "Med"){
      this.getStoreList();
    } else if(this.type == "Blood"){
      this.getBankList();
    }

  }

  getStoreList(){
    this.service.getMedicalStore()
      .subscribe(data => {
        if(data != null) this.storeList = data;
        this.setStoreLocation();
        this.total = this.storeList.length;
      }, error => console.log(error));
  }

  getBankList(){
    this.service.getBloodStore()
      .subscribe(data => {
        if(data != null) this.storeList = data;
        this.setStoreLocation();        
        this.total = this.storeList.length;
      },error => console.log(error));
  }

  publicOnPageChange(pageNum:number):void{
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  setStoreLocation(){
    
    for(let i=0;i<this.storeList.length;i++){
      this.storeList[i].dist = 99999999;
    }

    for(let i=0;i<this.storeList.length;i++){
      this.location.getGeoLocation(this.storeList[i].address)
        .subscribe(data=>{
          this.desLat = data.lat();
          this.desLon = data.lng();
          this.storeList[i].dist = Math.sqrt((this.desLat - this.latitude) 
            * (this.desLat - this.latitude) + (this.desLon - this.longitude) 
            * (this.desLon - this.longitude)) * 10;
          console.log(this.storeList[i].dist);
          this.storeList.sort((a, b) =>{
            if(a.dist < b.dist) return -1;
            if(a.dist > b.dist) return 1;
            return 0;
          });

        },error => console.log(error));
    }
    
  }

    //Get current location
    setCurrentLocation(){
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position)=>{
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      }
    }

}
