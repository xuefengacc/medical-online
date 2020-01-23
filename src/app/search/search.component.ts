import { Component, OnInit } from '@angular/core';
import { MedicalService } from '../services/medical.service';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Item } from '../model/item';
import { Observable } from 'rxjs';
import { Store } from '../model/store';
import { ActivatedRoute, Router } from '@angular/router';
import { noLeftSpaceValidator } from '../_helpers/validators/no-left-space.directive';
import { MedicineKey } from '../model/medicine-key';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  queryField: FormControl;
  query: string;

  medicines: Item[];
  bloods: Observable<Item[]>;
  medicals: Observable<Store[]>;
  banks: Observable<Store[]>;
  medGroup: Array<Item[]>;

  currentPage = 1;
  itemsPerPage = 5;
  pageSize:number;
  total:number;

  keys:Observable<MedicineKey[]>;
  //submitted = false;

  constructor(
    private service: MedicalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe( params => 
        this.query = params['query']
      );
    //There must be some better way
    this.queryField = new FormControl(this.query, 
      [Validators.required, noLeftSpaceValidator()]);
    this.onSearch();
    this.onSubmit();
  }

  onSubmit(){
    //this.submitted = true;
    this.service.searchMedicineByName(this.query)
      .subscribe(
        data => {
          this.medicines = data;
          this.medGroup = this.groupArray(this.medicines, 2);
          this.total = this.medGroup.length;
          console.log(this.medicines);
        }, error => console.log(error)); 
  }

  onSearch(){
    this.queryField.valueChanges
      .pipe(
      //debouncing(delay) the input
      debounceTime(200), 
      //discard emission
      distinctUntilChanged(),
      switchMap(query =>
      {
          this.query = query;
          return this.service.getMedicineKey(this.query); 
      }))
      .subscribe(
        data => {
          this.keys = data;
          //console.log(this.medicines);
        }
    );
    
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
