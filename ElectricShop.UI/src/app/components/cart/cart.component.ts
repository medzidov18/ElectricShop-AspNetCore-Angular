import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IDevice } from 'src/app/Models/device';
import { Observable } from 'rxjs';
import { DeviceApiService } from 'src/app/services/device-api.service';
import { ICartDevice } from './../../Models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    
    devices : IDevice[] = [];
    device: any;
    cartDevices: any;
    grandTotal !: any;
    values: [];

    categoryList: any[];
    ramList: any[];
    memoryList: any[];
    categoryList$: Observable<any[]>;
    ramList$: Observable<any[]>;
    memoryList$: Observable<any[]>; 

    categoryMap: Map<number, string> = new Map();
    ramMap: Map<number, string> = new Map();
    memoryMap: Map<number, string> = new Map();

    constructor(private cartService : CartService, private service : DeviceApiService) { }
  
    ngOnInit(): void {
      this.devices = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    
      this.grandTotal = this.cartService.getTotalPrice();
      this.ramList$ = this.service.getRamList();
      this.memoryList$ = this.service.getMemoryList()
      this.categoryList$ = this.service.getCategoryList();

      this.refreshAllMaps();
      localStorage.clear();
    }
    removeDevice(device: any){
      this.cartService.removeDevice(device);
      this.devices = this.cartService.getDevices();
      localStorage.setItem('cart_items', JSON.stringify(this.devices));
    }
    removeAllCart(){
      this.cartService.clearDevices();
    }

    refreshCategoryMap() {
        this.service.getCategoryList().subscribe(data => {
            this.categoryList = data;
    
            for (let i = 0; i < data.length; i++) 
            {
                this.categoryMap.set(this.categoryList[i].id, this.categoryList[i].name);
            }
        })
    }
    refreshRamMap() {
        this.service.getRamList().subscribe(data1 => {
            this.ramList = data1;
    
            for (let i = 0; i < data1.length; i++) 
            {
                this.ramMap.set(this.ramList[i].id, this.ramList[i].capacity);
            }
        })
      }
      refreshMemoryMap() {
        this.service.getMemoryList().subscribe(data2 => {
            this.memoryList = data2;
    
            for (let i = 0; i < data2.length; i++) 
            {
                this.memoryMap.set(this.memoryList[i].id, this.memoryList[i].capacity);
            }
        })
      }
      refreshAllMaps() {
        this.refreshCategoryMap(),
        this.refreshRamMap(),
        this.refreshMemoryMap()
      }

}
