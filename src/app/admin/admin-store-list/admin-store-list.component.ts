import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalService } from '../../services/medical.service';
import { Store } from '../../model/store';

@Component({
  selector: 'app-admin-store-list',
  templateUrl: './admin-store-list.component.html',
  styleUrls: ['./admin-store-list.component.css']
})
export class AdminStoreListComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 7;
  pageSize: number;
  stores: Array<Store>;
  total:number;

  constructor(private service: MedicalService) { }

  ngOnInit() {
      this.reloadData();
  }

  public onPageChange(pageNum: number):void{
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num:number):void{
    this.itemsPerPage = this.pageSize + num;
  }

  reloadData(){
    this.service.getStores()
      .subscribe(data => {
        this.stores = data;
        this.total = this.stores.length;
      });
  }

  refresh(){
    this.reloadData();
  }

  //deleteStores(){
  //  this.service.deleteAllStores()
  //    .subscribe(
  //      data => {
  //        console.log(data);
  //        this.reloadData();
  //      },
  //      error => console.log('ERROR: ' + error));
  //}

}
