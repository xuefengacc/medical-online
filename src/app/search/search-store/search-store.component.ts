import { Component, OnInit, Input } from '@angular/core';
import { MedicalService } from 'src/app/services/medical.service';
import { Store } from 'src/app/model/store';
import { Item } from 'src/app/model/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.component.html',
  styleUrls: ['./search-store.component.css']
})
export class SearchStoreComponent implements OnInit {

  items:Array<Item>;
  store: Store;
  email:string;
  medGroup: Array<Item[]>;

  currentPage = 1;
  itemsPerPage = 5;
  pageSize:number;
  total:number;

  constructor(
    private service:MedicalService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.service.getStoreByEmail(this.email)
      .subscribe(data => {
        if(data!=null) this.store = data;
      }, error => console.log(error));
    this.service.getItemByStore(this.email)
      .subscribe(data => {
        if(data != null) this.items = data;
        this.medGroup = this.groupArray(this.items,2);
        this.total = this.medGroup.length;
      }, error => console.log(error));
  }

  groupArray(data:Array<Item>, n:number):Array<Item[]>{
    let group = new Array<Item[]>();
    
    for(let i=0,j=0; i<data.length; i++){
      if (i >= n && i % n === 0) j++;
      group[j] = group[j] || [];
      group[j].push(data[i]);
    }

    return group;
  }

  public onPageChange(pageNum:number):void{
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
}
