import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../model/store';
import { Item } from '../model/item';
import { CheckStringService } from '../_helpers/check-string.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  private url='http://localhost:8080';
  constructor(
    private http:HttpClient,
    private check: CheckStringService) { }

  //-----------------------------------------------
  //--------------General operation----------------
  //-----------------------------------------------

  //-------------------Store-----------------------
  //Get store by id
  getStoreById(id:number):Observable<any>{
    return this.http.get(`${this.url}/store/${id}`);
  }
  
  getStoreByEmail(email:string):Observable<any>{
    return this.http.get(`${this.url}/store/itemstore/${email}`);
  }

  //Get all stores
  getStores():Observable<any>{
    return this.http.get(`${this.url}/store`);
  }
  
  //Search store by name
  searchStoreByName(name:string):Observable<any>{
    return this.http.get(`${this.url}/store/search/${name.trim().toLowerCase()}`);
  }
  
  //Get all medical stores
  getMedicalStore():Observable<any>{
    return this.http.get(`${this.url}/store/medical`);
  }
  
  //Get all blood stores
  getBloodStore():Observable<any>{
    return this.http.get(`${this.url}/store/blood`);
  }
  
  //Search medical store by name 
  searchMedicalStore(name:string):Observable<any>{
    return this.http.get(`${this.url}/store/search/medical/${name.trim().toLowerCase()}`);
  }

  //Search blood store by name
  searchBloodStore(name:string):Observable<any>{
    return this.http.get(`${this.url}/store/search/blood/${name.trim().toLowerCase()}`);
  }
  //Search by Address??

  //-------------------Item------------------------
  //Get all items
  getItems():Observable<any>{
    return this.http.get(`${this.url}/item`);
  }

  //Get all items of specific store
  //getItemsByStore(){
  //  return this.http.get(`${this.url}/`);
  //}

  //Search item by name
  searchItemByName(name:string):Observable<any>{
    return this.http.get(`${this.url}/item/search/${name.trim().toLowerCase()}`);
  }

 //Key operation
 getMedicineKey(name:string):Observable<any>{
   return this.http.get(`${this.url}/item/key/${name.trim().toLowerCase()}`);
 }

  //Get all blood
  getBloods():Observable<any>{
    return this.http.get(`${this.url}/item/blood`);
  }

  //Get all medicine
  getMedicines():Observable<any>{
    return this.http.get(`${this.url}/item/medicine`);
  }

  //Get blood by Type
  getBloodByType(type:string):Observable<any>{
    return this.http.get(`${this.url}/item/blood/type/${type}`);
  }

  //Get items by store
  getItemByStore(email:string):Observable<any>{
    return this.http.get(`${this.url}/item/store/${email}`);
  }

  //Search medicine by Name
  searchMedicineByName(name:string):Observable<any>{
    return this.http.get(`${this.url}/item/search/medicine/${name.trim().toLowerCase()}`);
  }
  
  //-----------------------------------------------
  //---------------Admin operation-----------------
  //-----------------------------------------------
  //Create Store
  saveStoreUser(store:Store):Observable<any>{
    return this.http.post(`${this.url}/admin/createstore`,store);
  }

  //Update Store
  updateStore(id:number, store:Store):Observable<any>{
    return this.http.put(`${this.url}/admin/store/${id}`,store);
  }

  //Delete Store
  deleteStore(id:number):Observable<any>{
    return this.http.delete(`${this.url}/admin/store/${id}`);
  }

  //-----------------------------------------------
  //--------------Manager operation----------------
  //-----------------------------------------------
  //Create Item
  createItem(item:Item):Observable<any>{
    return this.http.post(`${this.url}/manager`, item);
  }

  //image
  uploadImage(itemId:number,uploadData:FormData):Observable<any>{
    return this.http.put(`${this.url}/manager/image/${itemId}`,uploadData);
  }
  

  //Update Item
  updateItem(id:number, item:Item):Observable<any>{
    return this.http.put(`${this.url}/manager/${id}`,item);
  }

  //Get Store Item
  getStoreItem():Observable<any>{
    return this.http.get(`${this.url}/manager`);
  }
  
  //Delete Item
  deleteItem(id:number):Observable<any>{
    return this.http.delete(`${this.url}/manager/${id}`);
  }

  //Get Store by currentUser/Heaser
  autoGetStore():Observable<any>{
    return this.http.get(`${this.url}/mail/auto`);
  }

  downloadImage(id:number):Observable<any>{
    return this.http.get(`${this.url}/store/image/${id}`);
  }

  //background image
  uploadBackground(storeId:number,uploadData:FormData):Observable<any>{
    return this.http.put(`${this.url}/manager/background/${storeId}`,uploadData);
  }

  downloadBackground(id:number):Observable<any>{
    return this.http.get(`${this.url}/manager/background/${id}`);
  }
}
