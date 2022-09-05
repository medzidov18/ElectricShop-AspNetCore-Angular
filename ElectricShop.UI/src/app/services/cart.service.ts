import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public deviceList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.deviceList.asObservable();
  }

  setDevice(device : any){
    this.cartItemList.push(...device);
    this.deviceList.next(device);
  }
  addtoCart(device : any){
    this.cartItemList.push(device);
    this.deviceList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(device: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(device.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.deviceList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.deviceList.next(this.cartItemList);
  }
}
