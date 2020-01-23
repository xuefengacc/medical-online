import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { MedicalService } from 'src/app/services/medical.service';

@Component({
  selector: 'app-blood-list',
  templateUrl: './blood-list.component.html',
  styleUrls: ['./blood-list.component.css']
})
export class BloodListComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 7;
  pageSize: number;
  bloods: Array<Item>;
  total: number;

  constructor(
    private service: MedicalService
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  public onPageChange(pageNum:number):void{
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num:number):void{
    this.itemsPerPage = this.pageSize + num;
  }

  reloadData(){
    this.service.getStoreItem()
      .subscribe(data => {
        this.bloods = data;
        this.total = this.bloods.length;
      });
  }

  refresh(){
    this.reloadData();
  }
  //deleteBloods(){
  //
  //}

}
