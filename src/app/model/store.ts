import { Item } from './item';

export class Store {
    storeId:number;
    email:string;
    password:string;
    storeName:string;
    type:string;
    address:string;
    webSite:string;
    phone:number;
    roles:Array<any>;
    items:Array<Item>;
    imagePath:string;
    dist:number;
}
