import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { IDevice } from '../Models/device';
import { ICartDevice } from './../Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    devices: any[] = [];

  constructor() { }

  getDevices(){
    return this.devices;
  }

  addToCart(addedProduct : any){
    this.devices.push(addedProduct);
  }

  loadCart(): void {
    this.devices = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  deviceInCart(device: any): boolean {
    return this.devices.findIndex((x: any) => x.id === device.id) > -1;
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.devices.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
   }

  removeDevice(device: any) {
    const index = this.devices.findIndex((x: any) => x.id === device.id);

    if (index > -1) {
      this.devices.splice(index, 1);
    }
  }

  clearDevices() {
    localStorage.clear();
  }
}
