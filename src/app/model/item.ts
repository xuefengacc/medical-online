import { Store } from './store';
import { MedicineKey } from './medicine-key';

export class Item {
    itemId:number;
    itemName:string;
    price:number;
    producer:string;
    catalog:string;
    storage:number;
    bloodVolum:number;
    bloodType:string;
    type:string;
    store:Store;
    storeName:string;
    storeEmail:string;
    imagePaths:any;
    keyword:MedicineKey;
}
