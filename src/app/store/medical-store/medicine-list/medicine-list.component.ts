import { Component, OnInit } from '@angular/core';
import { MedicalService } from 'src/app/services/medical.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 7;
  pageSize: number;
  medicines: Array<Item>;
  total: number;

  constructor(
    private service: MedicalService
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  public onPageChange(pageNum:number):void{
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num:number):void{
    this.itemsPerPage = this.pageSize + num;
  }

  reloadData(){
    this.service.getStoreItem()
      .subscribe(data => {
        this.medicines = data;
        this.total = this.medicines.length;
      });
  }

  refresh(){
    this.reloadData();
  }

}
